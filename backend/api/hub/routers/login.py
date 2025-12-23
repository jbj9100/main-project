from fastapi import APIRouter
from schemas.user import Login

router = APIRouter(prefix="/api/hub/login", tags=["login"])

@router.get("/")
def login_get():
    return {"message": "login page"}

@router.post("/")
def login_post(login: Login):
    print("login : ", login.email)
    print("login : ", login.password)
    
