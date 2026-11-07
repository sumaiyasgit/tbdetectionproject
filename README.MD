# TB Care: Pediatric Chest X-ray Screening

A web app that takes a child's chest X-ray image, runs it through a convolutional neural network, and returns an AI-assisted screening result for tuberculosis (TB). It also includes plain-language educational content about TB in children.

> ⚠️ **Not a medical device.** This is a student project for learning and demonstration. Its output must never be used for diagnosis or treatment decisions. Always consult a qualified clinician.

<!-- After you take screenshots, save them in a folder called screenshots/ and uncomment the lines below.
![Home page](screenshots/home.png)
![Upload and result](screenshots/result.png)
-->

## Features

- Upload a chest X-ray (JPG/PNG), preview it, and get a result from the model
- Result page with the predicted label
- "Learn" page explaining what TB is, signs in children, prevention and when to see a doctor, plus illustrated TB "stories" (posters) in English and Hindi
- REST API (`POST /predict`) that can be used without the website

## How it works

```
React app  ──(image upload)──▶  FastAPI server  ──▶  CNN model (Keras)
   ▲                                  │
   └────────── label + confidence ◀───┘
```

1. The user picks an X-ray in the React app.
2. The image is sent to the FastAPI backend, converted to RGB and resized to 224 × 224.
3. The Keras model returns class probabilities, and the server sends back a label and confidence.

## The model

- **Type:** Sequential convolutional neural network (Keras)
- **Input:** 224 × 224 RGB image
- **Layers:** rescaling, three Conv2D + MaxPooling blocks (16, 32, 32 filters), dropout (0.25), dense layer (128), softmax output with 4 classes
- **Output classes:** 4 (softmax). The app shows only a simple result: class 0 is reported as "No TB Detected" and any other class as "TB Detected".

**Documentation status:** this repository contains the trained model and the application, but not the training code, the dataset details, the names of the 4 classes, or evaluation results (accuracy, sensitivity, specificity). No performance figures are claimed here.

## API

`POST /predict` with a form field named `file` containing the image.

```json
{ "label": "TB Detected", "confidence": 0.9123 }
```

`GET /` returns `{"status": "ok"}` so you can check the server is running.

## Run it locally

You need Python 3.10+ and Node.js 18+.

**1. Backend**

```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate          # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at http://127.0.0.1:8000 (interactive docs at `/docs`).

**2. Frontend** (in a second terminal)

```bash
cd tb-care-frontend
npm install
npm run dev
```

Open http://localhost:5173. To point the app at a different backend, copy `tb-care-frontend/.env.example` to `.env` and edit `VITE_API_URL`.

## Project structure

```
├── Backend/
│   ├── main.py             # FastAPI app and /predict endpoint
│   ├── model/              # trained Keras model (config + weights)
│   └── requirements.txt
└── tb-care-frontend/
    ├── src/
    │   ├── pages/          # Home, Upload, Results, Learn
    │   └── components/     # Navbar, Footer, XrayUpload, Loader
    └── package.json
```

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Python, FastAPI, TensorFlow / Keras, Pillow

## Limitations

- **Model performance is unknown.** It has not been evaluated on a documented test set, so the accuracy of its predictions cannot be stated.
- **The label mapping is unverified.** The model has 4 output classes, but the app reduces them to "TB" or "No TB" (class 0 versus all others). This mapping has not been checked against the original training class order.
- **The confidence value is the model's raw output probability.** It is not calibrated and should not be read as a real-world likelihood.
- Trained on an undocumented, probably limited dataset, so results may not generalise to other hospitals, scanners or age groups.
- Shows a label and a confidence value only; it does not explain *why* (for example, no heat-map).
- Has not been clinically validated.
- Built as a class project: the focus was on a working end-to-end application (upload, prediction, results, education page), not on a rigorous model evaluation.

## Possible improvements

- Retrain with documented data and report sensitivity, specificity and a confusion matrix on a held-out test set
- Show the names of the 4 classes and a per-class probability breakdown
- Highlight the lung regions that influenced the prediction (Grad-CAM)
- Deploy the backend and frontend so the app can be tried online

## Team

Built as a class project and presented to the class by a team of classmates.

Contributors: **[ADD NAMES, or delete this section]**
