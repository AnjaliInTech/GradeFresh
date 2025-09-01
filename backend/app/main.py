from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth
import os

app = FastAPI(title="GradeFresh API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

@app.get("/")
async def root():
    return {"message": "Welcome to GradeFresh API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}