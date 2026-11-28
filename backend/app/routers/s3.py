import os
from datetime import datetime

import boto3
from boto3.exceptions import S3UploadFailedError
from botocore.exceptions import ClientError
from fastapi import APIRouter, HTTPException, UploadFile
from pydantic import BaseModel

router = APIRouter(prefix="/s3", tags=["s3"])

# Endpoint, credentials and region come from the environment (AWS_ENDPOINT_URL, ...).
s3 = boto3.client("s3")
BUCKET = os.environ["S3_BUCKET"]


class S3File(BaseModel):
    key: str
    size: int
    last_modified: datetime


def aws_error(error: Exception) -> HTTPException:
    if isinstance(error, ClientError):
        message = error.response.get("Error", {}).get("Message") or str(error)
    else:
        message = str(error)
    return HTTPException(status_code=502, detail=message)


def ensure_bucket() -> None:
    """Create the bucket if it doesn't exist yet. Called once at startup."""
    try:
        s3.head_bucket(Bucket=BUCKET)
    except ClientError as error:
        if error.response.get("Error", {}).get("Code") not in ("404", "NoSuchBucket"):
            raise
        region = s3.meta.region_name
        if region and region != "us-east-1":
            s3.create_bucket(Bucket=BUCKET, CreateBucketConfiguration={"LocationConstraint": region})
        else:
            s3.create_bucket(Bucket=BUCKET)


@router.get("/files", response_model=list[S3File])
def list_files():
    try:
        pages = s3.get_paginator("list_objects_v2").paginate(Bucket=BUCKET)
        files = [
            S3File(key=obj["Key"], size=obj["Size"], last_modified=obj["LastModified"])
            for page in pages
            for obj in page.get("Contents", [])
        ]
    except ClientError as error:
        raise aws_error(error)
    return sorted(files, key=lambda f: f.last_modified, reverse=True)


@router.post("/files", response_model=S3File, status_code=201)
def upload_file(file: UploadFile):
    if not file.filename:
        raise HTTPException(status_code=400, detail="The uploaded file has no name")
    key = file.filename
    extra_args = {"ContentType": file.content_type} if file.content_type else None
    try:
        s3.upload_fileobj(file.file, BUCKET, key, ExtraArgs=extra_args)
        head = s3.head_object(Bucket=BUCKET, Key=key)
    except (ClientError, S3UploadFailedError) as error:
        raise aws_error(error)
    return S3File(key=key, size=head["ContentLength"], last_modified=head["LastModified"])
