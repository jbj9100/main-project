import os
from fastapi import FastAPI
from dotenv import load_dotenv

# router import
from api.v1.routers import main

# .env load
load_dotenv()

app = FastAPI()

# router
app.include_router(main.router) 
