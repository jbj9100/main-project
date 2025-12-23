from fastapi import APIRouter



router = APIRouter(prefix="/main", tags=["projects"])  


@router.get("/")
def main_page():
    return "main page"
