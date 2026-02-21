from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DB ----------------
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    level INTEGER DEFAULT 1
)
""")

conn.commit()


# ---------------- Models ----------------
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# ---------------- SIGNUP ----------------
@app.post("/signup")
def signup(user: SignupRequest):
    return {
        "id": 123,
        "name": user.name,
        "password": user.password,
        "level": 1,
        "email": user.email
    }


# ---------------- LOGIN ----------------
@app.post("/login")
def login(user: LoginRequest):

    cursor.execute("""
    SELECT id, name, email, password, level
    FROM users WHERE email=?
    """, (user.email,))

    db_user = cursor.fetchone()

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if db_user[3] != user.password:
        raise HTTPException(status_code=400, detail="Wrong password")

    return {
        "id": db_user[0],
        "name": db_user[1],
        "email": db_user[2],
        "password": db_user[3],
        "level": db_user[4]
    }