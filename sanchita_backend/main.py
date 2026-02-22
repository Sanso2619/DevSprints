from fastapi import FastAPI, HTTPException
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


# ---------------- MODELS ----------------

class SignupRequest(BaseModel):
    email: str
    name: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# ---------------- SIGNUP ----------------

@app.post("/api/users/signup")
async def signup(user: SignupRequest):
    global uid

    # Prevent duplicate email
    for u in users:
        if u["email"] == user.email:
            raise HTTPException(
                status_code=400,
                detail="User already exists"
            )

    new_user = {
        "id": uid,                 # ✅ use id (frontend expects this)
        "name": user.name,         # ✅ consistent key
        "email": user.email,
        "password": user.password,
        "level": 1,
        "role": "student"          # ✅ default role
    }

    users.append(new_user)
    uid += 1

    return new_user


# ---------------- LOGIN ----------------

@app.post("/api/users/login")
async def login(user: LoginRequest):

    for u in users:
        if u["email"] == user.email and u["password"] == user.password:

            # ✅ Don't send password back
            return {
                "id": u["id"],
                "name": u["name"],
                "email": u["email"],
                "role": u["role"],
                "level": u["level"]
            }

    raise HTTPException(
        status_code=401,
        detail="Invalid credentials"
    )