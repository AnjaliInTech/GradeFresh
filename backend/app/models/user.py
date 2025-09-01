from datetime import datetime
from typing import Optional, Any, Annotated
from pydantic import BaseModel, EmailStr, Field, ConfigDict, BeforeValidator
from bson import ObjectId
import re

# Simplified PyObjectId handler for Pydantic v2
PyObjectId = Annotated[str, BeforeValidator(str)]

class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    phone: str
    email: EmailStr
    role: str
    username: str
    password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        populate_by_name=True
    )