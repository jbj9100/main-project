

def create_login_session(request: Request) -> Request:
    request.state.session = {}
    session_id = str(uuid.uuid4())
    request.state.session["session_id"] = session_id

    return request

def get_login_session(request: Request) -> Request:
    if request.state.session is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return request.state.session

def close_login_session(request: Request):
    pass


