# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.routes import auth, admin

# app = FastAPI(title="GradeFresh API", version="1.0.0")

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include routers - FIXED: Remove prefix from auth router
# app.include_router(auth.router, prefix="/api", tags=["Authentication"])  # Changed from /api/auth to /api
# app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

# @app.get("/")
# async def root():
#     return {"message": "Welcome to GradeFresh API"}

# @app.get("/health")
# async def health_check():
#     return {"status": "healthy"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, admin

app = FastAPI(title="GradeFresh API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers - CORRECTED: Remove duplicate prefixes
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(admin.router, prefix="/api", tags=["Admin"])  # Changed from /api/admin to /api

@app.get("/")
async def root():
    return {"message": "Welcome to GradeFresh API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}