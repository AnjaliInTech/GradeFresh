from fastapi import APIRouter, HTTPException, status, Depends, Body
from fastapi.encoders import jsonable_encoder
from app.database.mongodb import get_database
from app.models.user import User, PyObjectId
from app.schemas.user import UserCreate, UserResponse, LoginRequest
from app.utils.security import get_password_hash, verify_password, create_access_token
from bson import ObjectId
from datetime import timedelta, datetime
import os

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    db = get_database()
    users_collection = db["users"]
    
    # Check if user already exists
    if await users_collection.find_one({"email": user.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    if await users_collection.find_one({"username": user.username}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create user document with timestamps
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    user_dict["_id"] = ObjectId()
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    
    # Insert user
    result = await users_collection.insert_one(user_dict)
    
    # Get the created user
    created_user = await users_collection.find_one({"_id": result.inserted_id})
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(created_user["_id"])}, 
        expires_delta=access_token_expires
    )
    
    # Build response with all required fields
    response_data = {
        "id": str(created_user["_id"]),
        "name": created_user["name"],
        "phone": created_user["phone"],
        "email": created_user["email"],
        "role": created_user["role"],
        "username": created_user["username"],
        "created_at": created_user["created_at"],
        "access_token": access_token,
        "token_type": "bearer"
    }
    
    return response_data

@router.post("/login")
async def login(login_data: LoginRequest = Body(...)):
    db = get_database()
    users_collection = db["users"]
    
    # Find user
    user = await users_collection.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user["_id"])}, 
        expires_delta=access_token_expires
    )
    
    # Build response with all required fields
    response_data = {
        "id": str(user["_id"]),
        "name": user["name"],
        "phone": user["phone"],
        "email": user["email"],
        "role": user["role"],
        "username": user["username"],
        "created_at": user.get("created_at", datetime.utcnow()),
        "access_token": access_token,
        "token_type": "bearer"
    }
    
    return response_data

@router.get("/admin/check")
async def check_admin_status(email: str):
    """
    Check if a user is an admin (useful for frontend to show/hide admin features)
    """
    db = get_database()
    users_collection = db["users"]
    
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {
        "is_admin": user["role"] == "admin",
        "email": user["email"],
        "role": user["role"]
    }