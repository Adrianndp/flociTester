from fastapi import FastAPI

from app.routers import aws_lambda, ec2, eks, s3

app = FastAPI()

for module in (s3, aws_lambda, eks, ec2):
    app.include_router(module.router)


@app.get("/health")
def health():
    return {"status": "ok"}
