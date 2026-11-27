from fastapi import APIRouter

router = APIRouter(prefix="/eks", tags=["eks"])


@router.get("")
def test():
    return {"result": "test"}
