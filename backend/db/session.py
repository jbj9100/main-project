import os 
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession

load_dotenv()

DATABASE_CONN = os.getenv("DATABASE_CONN")

engine: AsyncEngine = create_async_engine(
                       DATABASE_CONN, #echo=True,
                       #poolclass=NullPool, # Connection Pool 사용하지 않음. 
                       pool_size=10, 
                       max_overflow=0,
                       pool_recycle=300
                       )

# ORM은 "Connection" 대신 "Session"을 씁니다.
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,  # async에서 흔히 끔
    autoflush=False,
    autocommit=False,
)

# get_session()은 요청하나를 session 객체에 담음
# 그 session을 yield로 반환해서 라우터/서비스 레이어에서 명시적으로 commit/rollback을 함
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI Depends로 주입해서 쓰는 ORM Session 의존성.
    - 여기서는 HTTPException 던지지 않음
    - commit/rollback은 보통 라우터/서비스 레이어에서 명시적으로 함
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except SQLAlchemyError:
            # 세션 내부 에러면 rollback은 해주는게 안전
            await session.rollback()
            raise


async def ping_db() -> bool:
    """startup에서 DB 연결 체크(선택)."""
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return True
    except SQLAlchemyError:
        return False


async def dispose_engine() -> None:
    await engine.dispose()
