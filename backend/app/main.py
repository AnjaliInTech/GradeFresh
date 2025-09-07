# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# import numpy as np
# from PIL import Image
# import io
# import pickle
# from typing import List
# import os
# from datetime import datetime
# import uuid
# import logging
# import sys
# from pathlib import Path

# # Add the parent directory to Python path to import routes
# sys.path.append(str(Path(__file__).parent.parent))

# # Import your existing routers
# try:
#     from app.routes import auth, admin
# except ImportError:
#     # Fallback if routes don't exist yet
#     auth = None
#     admin = None

# # Set up logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# app = FastAPI(
#     title="GradeFresh API", 
#     description="API for fruit quality classification and user management",
#     version="1.0.0"
# )

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include routers if they exist
# if auth:
#     app.include_router(auth.router, prefix="/api", tags=["Authentication"])
# if admin:
#     app.include_router(admin.router, prefix="/api", tags=["Admin"])

# # Global variables for model and mappings
# model = None
# class_indices = {}
# label_mapping = {}
# img_height, img_width = 150, 150

# def load_models():
#     """Load the trained model and mappings"""
#     global model, class_indices, label_mapping
#     try:
#         # Go up one level from app/ to backend/ then to models/
#         models_dir = Path(__file__).parent.parent / "models"
#         model_path = models_dir / "fruit_quality_cnn_model.h5"
#         class_indices_path = models_dir / "class_indices.pkl"
#         label_mapping_path = models_dir / "label_mapping.pkl"
        
#         logger.info(f"Loading model from: {model_path}")
        
#         model = load_model(model_path)
#         with open(class_indices_path, 'rb') as f:
#             class_indices = pickle.load(f)
#         with open(label_mapping_path, 'rb') as f:
#             label_mapping = pickle.load(f)
#         logger.info("Model and mappings loaded successfully!")
#     except Exception as e:
#         logger.error(f"Error loading model: {e}")

# # Load model on startup
# @app.on_event("startup")
# async def startup_event():
#     load_models()

# def preprocess_image(image: Image.Image) -> np.ndarray:
#     """Preprocess image for model prediction"""
#     # Resize image to match model's expected sizing
#     image = image.resize((img_width, img_height))
#     # Convert to array and normalize
#     img_array = np.array(image) / 255.0
#     # Add batch dimension
#     img_array = np.expand_dims(img_array, axis=0)
#     return img_array

# def predict_fruit_quality(image: Image.Image) -> dict:
#     """Predict fruit quality from an image"""
#     # Preprocess image
#     img_array = preprocess_image(image)
    
#     # Make prediction
#     predictions = model.predict(img_array, verbose=0)
#     predicted_class = np.argmax(predictions[0])
#     confidence = np.max(predictions[0])
    
#     # Get class label
#     class_label = label_mapping[predicted_class]
    
#     # Determine quality status and detailed description
#     quality_info = get_quality_description(class_label, confidence)
    
#     # Get all class probabilities
#     all_predictions = {}
#     for class_idx, prob in enumerate(predictions[0]):
#         class_name = label_mapping.get(class_idx, f"Class_{class_idx}")
#         all_predictions[class_name] = float(prob)
    
#     return {
#         'class': class_label,
#         'confidence': float(confidence),
#         'quality_status': quality_info['status'],
#         'quality_code': quality_info['code'],
#         'description': quality_info['description'],
#         'export_suitable': quality_info['export_suitable'],
#         'all_predictions': all_predictions
#     }

# def get_quality_description(class_label: str, confidence: float) -> dict:
#     """Generate detailed quality description based on class"""
#     class_lower = class_label.lower()
    
#     if 'fresh' in class_lower:
#         return {
#             'status': "Excellent Quality",
#             'code': "excellent",
#             'description': f"This fruit appears fresh and high-quality with {confidence:.1%} confidence. It has optimal color, texture, and no visible signs of spoilage.",
#             'export_suitable': True
#         }
#     elif 'rotten' in class_lower:
#         return {
#             'status': "Poor Quality",
#             'code': "poor",
#             'description': f"This fruit shows signs of spoilage with {confidence:.1%} confidence. It may have bruising, mold, or over-ripening that makes it unsuitable for sale.",
#             'export_suitable': False
#         }
#     elif 'ripe' in class_lower:
#         return {
#             'status': "Good Quality",
#             'code': "good",
#             'description': f"This fruit is at perfect ripeness with {confidence:.1%} confidence. It's ready for immediate consumption or short-term sale.",
#             'export_suitable': True
#         }
#     else:
#         return {
#             'status': "Unknown Quality",
#             'code': "unknown",
#             'description': f"The quality assessment is uncertain ({confidence:.1%} confidence). Please try with a clearer image or different fruit.",
#             'export_suitable': False
#         }

# @app.get("/")
# async def root():
#     return {"message": "Welcome to GradeFresh API"}

# @app.get("/health")
# async def health_check():
#     model_status = "loaded" if model is not None else "not loaded"
#     return {"status": "healthy", "model_status": model_status}

# @app.get("/api/classes")
# async def get_classes():
#     if not class_indices:
#         raise HTTPException(status_code=503, detail="Model not loaded")
#     return {"classes": list(class_indices.keys())}

# @app.post("/api/predict")
# async def predict(file: UploadFile = File(...)):
#     if model is None:
#         raise HTTPException(status_code=503, detail="Model not loaded")
    
#     # Validate file type
#     if not file.content_type.startswith('image/'):
#         raise HTTPException(status_code=400, detail="File must be an image")
    
#     try:
#         # Read image file
#         contents = await file.read()
#         image = Image.open(io.BytesIO(contents)).convert('RGB')
        
#         # Make prediction
#         prediction = predict_fruit_quality(image)
        
#         # Generate unique prediction ID
#         prediction_id = str(uuid.uuid4())
        
#         return {
#             "prediction_id": prediction_id,
#             "timestamp": datetime.now().isoformat(),
#             "filename": file.filename,
#             "prediction": prediction
#         }
        
#     except Exception as e:
#         logger.error(f"Error processing image: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

# @app.post("/api/predict-batch")
# async def predict_batch(files: List[UploadFile] = File(...)):
#     if model is None:
#         raise HTTPException(status_code=503, detail="Model not loaded")
    
#     if len(files) > 10:  # Limit batch size
#         raise HTTPException(status_code=400, detail="Maximum 10 files allowed per batch")
    
#     results = []
#     for file in files:
#         # Validate file type
#         if not file.content_type.startswith('image/'):
#             results.append({
#                 "filename": file.filename,
#                 "error": "File must be an image"
#             })
#             continue
        
#         try:
#             # Read image file
#             contents = await file.read()
#             image = Image.open(io.BytesIO(contents)).convert('RGB')
            
#             # Make prediction
#             prediction = predict_fruit_quality(image)
            
#             results.append({
#                 "filename": file.filename,
#                 "prediction": prediction,
#                 "success": True
#             })
            
#         except Exception as e:
#             results.append({
#                 "filename": file.filename,
#                 "error": str(e),
#                 "success": False
#             })
    
#     return {
#         "batch_id": str(uuid.uuid4()),
#         "timestamp": datetime.now().isoformat(),
#         "results": results
#     }

# @app.get("/api/model-info")
# async def model_info():
#     if model is None:
#         raise HTTPException(status_code=503, detail="Model not loaded")
    
#     return {
#         "input_shape": model.input_shape,
#         "output_shape": model.output_shape,
#         "layers": len(model.layers),
#         "classes": list(class_indices.keys()),
#         "class_count": len(class_indices)
#     }

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import pickle
from typing import List
import os
from datetime import datetime
import uuid
import logging
import sys
from pathlib import Path

# Add the parent directory to Python path to import routes
sys.path.append(str(Path(__file__).parent.parent))

# Import your existing routers
try:
    from app.routes import auth, admin, news
except ImportError:
    # Fallback if routes don't exist yet
    auth = None
    admin = None
    news = None

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="GradeFresh API", 
    description="API for fruit quality classification and user management",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers if they exist
if auth:
    app.include_router(auth.router, prefix="/api", tags=["Authentication"])
if admin:
    app.include_router(admin.router, prefix="/api", tags=["Admin"])
if news:
    app.include_router(news.router, prefix="/api", tags=["News"])

# Global variables for model and mappings
model = None
class_indices = {}
label_mapping = {}
img_height, img_width = 150, 150

def load_models():
    """Load the trained model and mappings"""
    global model, class_indices, label_mapping
    try:
        # Go up one level from app/ to backend/ then to models/
        models_dir = Path(__file__).parent.parent / "models"
        model_path = models_dir / "fruit_quality_cnn_model.h5"
        class_indices_path = models_dir / "class_indices.pkl"
        label_mapping_path = models_dir / "label_mapping.pkl"
        
        logger.info(f"Loading model from: {model_path}")
        
        model = load_model(model_path)
        with open(class_indices_path, 'rb') as f:
            class_indices = pickle.load(f)
        with open(label_mapping_path, 'rb') as f:
            label_mapping = pickle.load(f)
        logger.info("Model and mappings loaded successfully!")
    except Exception as e:
        logger.error(f"Error loading model: {e}")

# Load model on startup
@app.on_event("startup")
async def startup_event():
    load_models()

def preprocess_image(image: Image.Image) -> np.ndarray:
    """Preprocess image for model prediction"""
    # Resize image to match model's expected sizing
    image = image.resize((img_width, img_height))
    # Convert to array and normalize
    img_array = np.array(image) / 255.0
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_fruit_quality(image: Image.Image) -> dict:
    """Predict fruit quality from an image"""
    # Preprocess image
    img_array = preprocess_image(image)
    
    # Make prediction
    predictions = model.predict(img_array, verbose=0)
    predicted_class = np.argmax(predictions[0])
    confidence = np.max(predictions[0])
    
    # Get class label
    class_label = label_mapping[predicted_class]
    
    # Determine quality status and detailed description
    quality_info = get_quality_description(class_label, confidence)
    
    # Get all class probabilities
    all_predictions = {}
    for class_idx, prob in enumerate(predictions[0]):
        class_name = label_mapping.get(class_idx, f"Class_{class_idx}")
        all_predictions[class_name] = float(prob)
    
    return {
        'class': class_label,
        'confidence': float(confidence),
        'quality_status': quality_info['status'],
        'quality_code': quality_info['code'],
        'description': quality_info['description'],
        'export_suitable': quality_info['export_suitable'],
        'all_predictions': all_predictions
    }

def get_quality_description(class_label: str, confidence: float) -> dict:
    """Generate detailed quality description based on class"""
    class_lower = class_label.lower()
    
    if 'fresh' in class_lower:
        return {
            'status': "Excellent Quality",
            'code': "excellent",
            'description': f"This fruit appears fresh and high-quality with {confidence:.1%} confidence. It has optimal color, texture, and no visible signs of spoilage.",
            'export_suitable': True
        }
    elif 'rotten' in class_lower:
        return {
            'status': "Poor Quality",
            'code': "poor",
            'description': f"This fruit shows signs of spoilage with {confidence:.1%} confidence. It may have bruising, mold, or over-ripening that makes it unsuitable for sale.",
            'export_suitable': False
        }
    elif 'ripe' in class_lower:
        return {
            'status': "Good Quality",
            'code': "good",
            'description': f"This fruit is at perfect ripeness with {confidence:.1%} confidence. It's ready for immediate consumption or short-term sale.",
            'export_suitable': True
        }
    else:
        return {
            'status': "Unknown Quality",
            'code': "unknown",
            'description': f"The quality assessment is uncertain ({confidence:.1%} confidence). Please try with a clearer image or different fruit.",
            'export_suitable': False
        }

@app.get("/")
async def root():
    return {"message": "Welcome to GradeFresh API"}

@app.get("/health")
async def health_check():
    model_status = "loaded" if model is not None else "not loaded"
    return {"status": "healthy", "model_status": model_status}

@app.get("/api/classes")
async def get_classes():
    if not class_indices:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"classes": list(class_indices.keys())}

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Make prediction
        prediction = predict_fruit_quality(image)
        
        # Generate unique prediction ID
        prediction_id = str(uuid.uuid4())
        
        return {
            "prediction_id": prediction_id,
            "timestamp": datetime.now().isoformat(),
            "filename": file.filename,
            "prediction": prediction
        }
        
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/api/predict-batch")
async def predict_batch(files: List[UploadFile] = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    if len(files) > 10:  # Limit batch size
        raise HTTPException(status_code=400, detail="Maximum 10 files allowed per batch")
    
    results = []
    for file in files:
        # Validate file type
        if not file.content_type.startswith('image/'):
            results.append({
                "filename": file.filename,
                "error": "File must be an image"
            })
            continue
        
        try:
            # Read image file
            contents = await file.read()
            image = Image.open(io.BytesIO(contents)).convert('RGB')
            
            # Make prediction
            prediction = predict_fruit_quality(image)
            
            results.append({
                "filename": file.filename,
                "prediction": prediction,
                "success": True
            })
            
        except Exception as e:
            results.append({
                "filename": file.filename,
                "error": str(e),
                "success": False
            })
    
    return {
        "batch_id": str(uuid.uuid4()),
        "timestamp": datetime.now().isoformat(),
        "results": results
    }

@app.get("/api/model-info")
async def model_info():
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "input_shape": model.input_shape,
        "output_shape": model.output_shape,
        "layers": len(model.layers),
        "classes": list(class_indices.keys()),
        "class_count": len(class_indices)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)