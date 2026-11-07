# main.py
import io
from pathlib import Path

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
from keras.saving import load_model

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model from the "model" folder next to this file, so the server works
# no matter which directory it is started from.
MODEL_DIR = Path(__file__).parent / "model"
model = load_model(str(MODEL_DIR))


@app.get("/")
def health():
    """Simple check that the server is running."""
    return {"status": "ok"}

@app.post("/predict")
async def predict_xray(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        # preprocess image
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224))
        img_array = np.array(image).astype(np.float32)
        img_array = np.expand_dims(img_array, axis=0)

        preds = model.predict(img_array)[0]
        idx = int(np.argmax(preds))

        # simple binary mapping
        # NOTE: the model has 4 output classes. Index 0 is treated as "No TB" and
        # every other index as "TB". Confirm this matches the class order used
        # in training and document the class names in the README.
        if idx == 0:
            label = "No TB Detected"
            confidence = float(preds[0])
        else:
            label = "TB Detected"
            confidence = float(preds[idx])

        return {
            "label": label,
            "confidence": round(confidence, 4)
        }

    except Exception as e:
        return {"error": str(e)}
