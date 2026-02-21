from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fake memory
users = []
uid = 1


class SignupRequest(BaseModel):
    email: str
    name: str
    password: str


@app.post("/api/users/signup")
async def signup(user: SignupRequest):
    global uid

    new_user = {
        "userId": uid,
        "userName": user.name,
        "password": user.password,
        "level": 1,
        "email": user.email
    }

    users.append(new_user)
    uid += 1

    return new_user


@app.post("/api/users/login")
async def login(user: SignupRequest):

    for u in users:
        if u["email"] == user.email and u["password"] == user.password:
            return u

    return {"error": "Invalid credentials"}