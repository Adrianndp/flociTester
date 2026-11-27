from fastapi import APIRouter

router = APIRouter(prefix="/lambda", tags=["lambda"])


@router.get("")
def test():
    return {"result": "test"}
