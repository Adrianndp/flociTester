from fastapi import APIRouter

router = APIRouter(prefix="/ec2", tags=["ec2"])


@router.get("")
def test():
    return {"result": "test"}
