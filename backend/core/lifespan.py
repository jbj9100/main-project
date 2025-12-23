from contextlib import asynccontextmanager
from fastapi import FastAPI
from db.session import dispose_engine, ping_db



@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        if not await ping_db():
            raise Exception("Database connection failed")
        else:
            print("Database connection successful")

        # redis_client = create_redis()
        # await ping_redis(redis_client)

        # # 앱 전역 상태에 저장
        # app.state.redis = redis_client

        yield
    finally:
        # await close_redis(app.state.redis)
        await dispose_engine()