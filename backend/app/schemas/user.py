from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    role: str
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    phone: str
    email: EmailStr
    role: str
    username: str
    created_at: Optional[datetime] = None
    access_token: Optional[str] = None
    token_type: Optional[str] = None

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str