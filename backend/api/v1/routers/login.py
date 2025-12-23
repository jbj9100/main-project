from fastapi import APIRouter
from schemas.user import User

router = APIRouter(prefix="/login", tags=["login"])

@router.get("/")
def login():
    return "login"


@router.post("/")
def login(user: User):
    return "login"