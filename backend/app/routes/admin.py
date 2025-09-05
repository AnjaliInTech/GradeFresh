# from fastapi import APIRouter, HTTPException, Depends, status, Form
# from datetime import timedelta
# from app.database.mongodb import get_database
# from app.utils.security import verify_password, create_access_token, get_current_user
# from app.models.user import User
# from bson import ObjectId
# from typing import List

# router = APIRouter(prefix="/admin", tags=["Admin"])

# # Admin login endpoint
# @router.post("/login")
# async def admin_login(email: str = Form(...), password: str = Form(...)):
#     """
#     Admin login endpoint at /api/admin/login
#     """
#     db = get_database()
#     users_collection = db["users"]
    
#     # Find user by email
#     user = await users_collection.find_one({"email": email})
#     if not user or not verify_password(password, user["password"]):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
    
#     # Check if user is admin
#     if user["role"] != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Admin access required. This account does not have admin privileges."
#         )
    
#     # Create access token
#     access_token_expires = timedelta(minutes=30)
#     access_token = create_access_token(
#         data={"sub": str(user["_id"])}, 
#         expires_delta=access_token_expires
#     )
    
#     # Build response with all required fields
#     response_data = {
#         "id": str(user["_id"]),
#         "name": user["name"],
#         "phone": user["phone"],
#         "email": user["email"],
#         "role": user["role"],
#         "username": user["username"],
#         "created_at": user.get("created_at"),
#         "access_token": access_token,
#         "token_type": "bearer"
#     }
    
#     return response_data

# # Admin authorization check
# async def verify_admin(current_user: User = Depends(get_current_user)):
#     if current_user.role != "admin":
#         raise HTTPException(status_code=403, detail="Admin access required")
#     return current_user

# # Admin dashboard statistics
# @router.get("/stats")
# async def get_admin_stats(admin: User = Depends(verify_admin)):
#     db = get_database()
#     users_collection = db["users"]
    
#     stats = {
#         "total_users": await users_collection.count_documents({}),
#         "exporters": await users_collection.count_documents({"role": "exporters"}),
#         "importers": await users_collection.count_documents({"role": "importers"}),
#         "inspectors": await users_collection.count_documents({"role": "inspectors"}),
#         "admins": await users_collection.count_documents({"role": "admin"}),
#     }
#     return stats

# # Get all users (admin only)
# @router.get("/users")
# async def get_all_users(admin: User = Depends(verify_admin)):
#     db = get_database()
#     users_collection = db["users"]
    
#     users = await users_collection.find().to_list(100)
#     # Remove passwords from response
#     for user in users:
#         user["id"] = str(user["_id"])
#         if "password" in user:
#             del user["password"]
#         if "_id" in user:
#             del user["_id"]
    
#     return users

from fastapi import APIRouter, HTTPException, Depends, status, Form
from datetime import timedelta
from app.database.mongodb import get_database
from app.utils.security import verify_password, create_access_token, get_current_user
from app.models.user import User
from bson import ObjectId
from typing import List

# CORRECTED: Remove prefix since we're handling it in main.py
router = APIRouter(tags=["Admin"])

# Admin login endpoint - NOW at /api/admin/login
@router.post("/admin/login")
async def admin_login(email: str = Form(...), password: str = Form(...)):
    """
    Admin login endpoint at /api/admin/login
    """
    db = get_database()
    users_collection = db["users"]
    
    # Find user by email
    user = await users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is admin
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required. This account does not have admin privileges."
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
        "created_at": user.get("created_at"),
        "access_token": access_token,
        "token_type": "bearer"
    }
    
    return response_data

# Admin authorization check
async def verify_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# Admin dashboard statistics - NOW at /api/admin/stats
@router.get("/admin/stats")
async def get_admin_stats(admin: User = Depends(verify_admin)):
    db = get_database()
    users_collection = db["users"]
    
    stats = {
        "total_users": await users_collection.count_documents({}),
        "exporters": await users_collection.count_documents({"role": "exporters"}),
        "importers": await users_collection.count_documents({"role": "importers"}),
        "inspectors": await users_collection.count_documents({"role": "inspectors"}),
        "admins": await users_collection.count_documents({"role": "admin"}),
    }
    return stats

# Get all users (admin only) - NOW at /api/admin/users
@router.get("/admin/users")
async def get_all_users(admin: User = Depends(verify_admin)):
    db = get_database()
    users_collection = db["users"]
    
    users = await users_collection.find().to_list(100)
    # Remove passwords from response
    for user in users:
        user["id"] = str(user["_id"])
        if "password" in user:
            del user["password"]
        if "_id" in user:
            del user["_id"]
    
    return users


