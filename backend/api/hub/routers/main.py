from fastapi import APIRouter


router = APIRouter(prefix="/api/hub/main", tags=["main"])  

@router.get("/")
def main_page():
    return "main page"
