from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from models.user import User
from core.password_hash import hash_password
from fastapi import HTTPException

async def signup_user(session: AsyncSession, username: str, email: str, password: str) -> User:
    # 1) 중복 체크(친절한 에러를 주기 위해)
    r1 = await session.execute(select(User).where(User.username == username))
    if r1.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="USERNAME_EXISTS")

    r2 = await session.execute(select(User).where(User.email == email))
    if r2.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="EMAIL_EXISTS")

    # 2) 비밀번호 해싱 후 저장
    user = User(
        email=email,
        username=username,
        password=password,
        # password_hash=hash_password(password),
        # created_dt는 auto_now_add=True로 설정되어있어서 넣지 않아도 commit시점에 자동으로 생성됨
    )

    session.add(user)          # 여전히 created_dt는 없는 상태

    try:
        await session.commit()       # 여기서 자동으로 추가된다.
    except IntegrityError:
        await session.rollback()
        # 레이스 컨디션 대비(동시에 가입 요청 들어오면 여기 걸릴 수 있음)
        raise HTTPException(status_code=400, detail="DUPLICATE")

    await session.refresh(user)
    
    return user  # user 객체
