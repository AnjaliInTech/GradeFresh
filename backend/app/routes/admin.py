from fastapi import APIRouter, HTTPException, Depends, status, Form
from datetime import timedelta
from app.database.mongodb import get_database
from app.utils.security import verify_password, create_access_token, get_current_user
from app.models.user import User
from bson import ObjectId
from typing import List

router = APIRouter(tags=["Admin"])

# Admin login endpoint
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

# Admin dashboard statistics - FIXED role names
@router.get("/admin/stats")
async def get_admin_stats(admin: User = Depends(verify_admin)):
    db = get_database()
    users_collection = db["users"]
    
    stats = {
        "total_users": await users_collection.count_documents({}),
        "exporters": await users_collection.count_documents({"role": "exporter"}),
        "importers": await users_collection.count_documents({"role": "importer"}),
        "inspectors": await users_collection.count_documents({"role": "inspector"}),
        "admins": await users_collection.count_documents({"role": "admin"}),
    }
    return stats

# Get all users EXCEPT admins (admin only)
@router.get("/admin/users")
async def get_all_users(admin: User = Depends(verify_admin)):
    db = get_database()
    users_collection = db["users"]
    
    # Get all users EXCEPT admins
    users = await users_collection.find({"role": {"$ne": "admin"}}).to_list(100)
    
    # Remove passwords from response and format properly
    formatted_users = []
    for user in users:
        formatted_user = {
            "id": str(user["_id"]),
            "name": user.get("name", ""),
            "email": user.get("email", ""),
            "phone": user.get("phone", ""),
            "role": user.get("role", ""),
            "username": user.get("username", ""),
            "created_at": user.get("created_at", ""),
        }
        formatted_users.append(formatted_user)
    
    return formatted_users

# Delete user endpoint (admin only) - CANNOT delete other admins
@router.delete("/admin/users/{user_id}")
async def delete_user(user_id: str, admin: User = Depends(verify_admin)):
    db = get_database()
    users_collection = db["users"]
    
    try:
        # Check if user exists
        user = await users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Prevent admin from deleting other admins
        if user.get("role") == "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot delete admin users"
            )
        
        # Delete the user
        result = await users_collection.delete_one({"_id": ObjectId(user_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return {"message": "User deleted successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting user: {str(e)}"
        )