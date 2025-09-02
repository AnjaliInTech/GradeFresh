# check_admin.py
import asyncio
from app.database.mongodb import get_database
from app.utils.security import verify_password

async def check_admin_user():
    db = get_database()
    users_collection = db["users"]
    
    # Check if admin user exists
    admin_user = await users_collection.find_one({"email": "admin123@gmail.com"})
    
    if admin_user:
        print("✅ Admin user found:")
        print(f"Email: {admin_user['email']}")
        print(f"Role: {admin_user['role']}")
        print(f"Name: {admin_user['name']}")
        
        # Test password verification
        test_password = "admin123"
        is_password_correct = verify_password(test_password, admin_user['password'])
        print(f"Password 'admin123' correct: {is_password_correct}")
        
    else:
        print("❌ Admin user not found!")
    
    # List all users
    print("\nAll users in database:")
    users = await users_collection.find().to_list(10)
    for user in users:
        print(f"- {user['email']} (Role: {user['role']})")

if __name__ == "__main__":
    asyncio.run(check_admin_user())