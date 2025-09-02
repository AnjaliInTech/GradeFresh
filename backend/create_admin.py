# create_admin.py
import asyncio
from app.database.mongodb import get_database
from app.utils.security import get_password_hash
from datetime import datetime
from bson import ObjectId

async def create_admin_user():
    db = get_database()
    users_collection = db["users"]
    
    admin_user = {
        "_id": ObjectId(),
        "name": "Admin User",
        "phone": "+1234567890",
        "email": "admin123@gmail.com",
        "role": "admin",
        "username": "admin",
        "password": get_password_hash("admin123"),  # Password: admin123
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    # Check if admin already exists
    existing_admin = await users_collection.find_one({"email": "admin123@gmail.com"})
    if existing_admin:
        print("✅ Admin user already exists")
        # Update password if needed
        if not existing_admin.get('password'):
            await users_collection.update_one(
                {"email": "admin123@gmail.com"},
                {"$set": {"password": get_password_hash("admin123")}}
            )
            print("✅ Password updated")
    else:
        # Create new admin user
        await users_collection.insert_one(admin_user)
        print("✅ Admin user created successfully!")
    
    print("Login credentials:")
    print("Email: admin123@gmail.com")
    print("Password: admin123")

if __name__ == "__main__":
    asyncio.run(create_admin_user())