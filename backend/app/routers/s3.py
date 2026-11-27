from fastapi import APIRouter

router = APIRouter(prefix="/s3", tags=["s3"])


@router.get("")
def test():
    return {"result": "test"}
