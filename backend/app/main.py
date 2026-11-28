from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.routers import aws_lambda, ec2, eks, s3


@asynccontextmanager
async def lifespan(_app: FastAPI):
    s3.ensure_bucket()
    yield


app = FastAPI(lifespan=lifespan)

for module in (s3, aws_lambda, eks, ec2):
    app.include_router(module.router)


@app.get("/health")
def health():
    return {"status": "ok"}
