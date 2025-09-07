from fastapi import APIRouter, HTTPException, Depends, status
from bson import ObjectId
from datetime import datetime
from typing import List

from app.database.mongodb import get_database
from app.models.news import News, NewsCreate, NewsUpdate
from app.models.user import User
from app.routes.admin import verify_admin

router = APIRouter(tags=["News"])

# Get all news
@router.get("/admin/news", response_model=List[News])
async def get_all_news(admin: User = Depends(verify_admin)):
    db = get_database()
    news_collection = db["news"]
    
    news = await news_collection.find().sort("created_at", -1).to_list(100)
    return news

# Get single news item
@router.get("/admin/news/{news_id}", response_model=News)
async def get_news(news_id: str, admin: User = Depends(verify_admin)):
    db = get_database()
    news_collection = db["news"]
    
    if not ObjectId.is_valid(news_id):
        raise HTTPException(status_code=400, detail="Invalid news ID")
    
    news = await news_collection.find_one({"_id": ObjectId(news_id)})
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    return news

# Create news
@router.post("/admin/news", response_model=News, status_code=status.HTTP_201_CREATED)
async def create_news(news_data: NewsCreate, admin: User = Depends(verify_admin)):
    db = get_database()
    news_collection = db["news"]
    
    news_dict = news_data.dict()
    news_dict["_id"] = ObjectId()
    news_dict["author"] = admin.name
    news_dict["created_at"] = datetime.utcnow()
    news_dict["updated_at"] = datetime.utcnow()
    
    result = await news_collection.insert_one(news_dict)
    created_news = await news_collection.find_one({"_id": result.inserted_id})
    
    return created_news

# Update news
@router.put("/admin/news/{news_id}", response_model=News)
async def update_news(news_id: str, news_data: NewsUpdate, admin: User = Depends(verify_admin)):
    db = get_database()
    news_collection = db["news"]
    
    if not ObjectId.is_valid(news_id):
        raise HTTPException(status_code=400, detail="Invalid news ID")
    
    # Check if news exists
    existing_news = await news_collection.find_one({"_id": ObjectId(news_id)})
    if not existing_news:
        raise HTTPException(status_code=404, detail="News not found")
    
    # Prepare update data
    update_data = news_data.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await news_collection.update_one(
        {"_id": ObjectId(news_id)},
        {"$set": update_data}
    )
    
    updated_news = await news_collection.find_one({"_id": ObjectId(news_id)})
    return updated_news

# Delete news
@router.delete("/admin/news/{news_id}")
async def delete_news(news_id: str, admin: User = Depends(verify_admin)):
    db = get_database()
    news_collection = db["news"]
    
    if not ObjectId.is_valid(news_id):
        raise HTTPException(status_code=400, detail="Invalid news ID")
    
    result = await news_collection.delete_one({"_id": ObjectId(news_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")
    
    return {"message": "News deleted successfully"}

# Public endpoint to get published news
@router.get("/news", response_model=List[News])
async def get_public_news():
    db = get_database()
    news_collection = db["news"]
    
    news = await news_collection.find({"is_published": True}).sort("created_at", -1).to_list(50)
    return news