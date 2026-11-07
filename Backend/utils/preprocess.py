from PIL import Image
import numpy as np
import io

def preprocess_image(image_bytes):
    # Load image
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Resize to your model's input size (most models use 224x224)
    image = image.resize((224, 224))

    # Convert to array
    img_array = np.array(image) / 255.0  # normalize 0-1

    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)

    return img_array
