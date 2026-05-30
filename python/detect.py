# =========================================================
# detect.py
# HYBRID MAGGOT DENSITY DETECTION
# YOLO + HSV
# FOR LARAVEL DEPLOYMENT
# =========================================================

# =========================================================
# IMPORT
# =========================================================

import sys
import json
import cv2
import numpy as np
import os

from datetime import datetime
from ultralytics import YOLO

# =========================================================
# LOAD IMAGE PATH
# =========================================================

image_path = sys.argv[1]

# =========================================================
# LOAD IMAGE
# =========================================================

img = cv2.imread(image_path)

if img is None:

    result = {
        "status": "error",
        "message": "Image gagal dibaca"
    }

    print(json.dumps(result))
    sys.exit()

# =========================================================
# RGB
# =========================================================

img_rgb = cv2.cvtColor(
    img,
    cv2.COLOR_BGR2RGB
)

img_h, img_w = img.shape[:2]

image_area = img_h * img_w

# =========================================================
# =========================================================
# LOAD YOLO MODEL
# =========================================================
# =========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "modelmaggot.pt")

model = YOLO(model_path)

# =========================================================
# =========================================================
# 1. YOLO ESTIMATION
# =========================================================
# =========================================================

results = model.predict(
    source=img,
    conf=0.25,
    imgsz=640,
    max_det=600,
    verbose=False
)

# =========================================================
# YOLO DENSITY
# =========================================================

total_box_area = 0

boxes = results[0].boxes

for box in boxes:

    x1, y1, x2, y2 = box.xyxy[0]

    w = x2 - x1
    h = y2 - y1

    area = w * h

    total_box_area += area

# tensor -> float
total_box_area = float(total_box_area)

# density
yolo_density = total_box_area / image_area

# scaling correction
yolo_density *= 1.2

# clamp
yolo_density = min(yolo_density, 1.0)

yolo_percent = yolo_density * 100

total_detection = len(boxes)

# =========================================================
# YOLO RESULT IMAGE
# =========================================================

yolo_result = results[0].plot()

# =========================================================
# =========================================================
# 2. HSV ESTIMATION
# =========================================================
# =========================================================

# =========================================================
# SHADING CORRECTION
# =========================================================

gray = cv2.cvtColor(
    img,
    cv2.COLOR_BGR2GRAY
)

background = cv2.GaussianBlur(
    gray,
    (151,151),
    0
)

img_float = img.astype(np.float32)

background = background.astype(np.float32)

background += 1

corrected = np.zeros_like(img_float)

for i in range(3):

    corrected[:,:,i] = (
        img_float[:,:,i] / background
    ) * 130

corrected = np.clip(
    corrected,
    0,
    255
)

corrected = corrected.astype(np.uint8)

# =========================================================
# CLAHE
# =========================================================

lab = cv2.cvtColor(
    corrected,
    cv2.COLOR_BGR2LAB
)

l, a, b = cv2.split(lab)

clahe = cv2.createCLAHE(
    clipLimit=2.5,
    tileGridSize=(8,8)
)

l_clahe = clahe.apply(l)

lab = cv2.merge((l_clahe, a, b))

clahe_result = cv2.cvtColor(
    lab,
    cv2.COLOR_LAB2BGR
)

# =========================================================
# WHITE BALANCE CORRECTION
# =========================================================

lab2 = cv2.cvtColor(
    clahe_result,
    cv2.COLOR_BGR2LAB
)

l2, a2, b2 = cv2.split(lab2)

a2 = cv2.add(a2, -3)
b2 = cv2.add(b2, 3)

lab2 = cv2.merge((l2, a2, b2))

final_preprocess = cv2.cvtColor(
    lab2,
    cv2.COLOR_LAB2BGR
)

# =========================================================
# CENTER ROI CROP
# =========================================================

h, w = final_preprocess.shape[:2]

crop = final_preprocess[
    int(h*0.15):int(h*0.85),
    int(w*0.15):int(w*0.85)
]

final_preprocess = crop

# =========================================================
# GAUSSIAN BLUR
# =========================================================

final_preprocess = cv2.GaussianBlur(
    final_preprocess,
    (5,5),
    0
)

# =========================================================
# HSV
# =========================================================

hsv = cv2.cvtColor(
    final_preprocess,
    cv2.COLOR_BGR2HSV
)

# =========================================================
# HSV RANGE
# =========================================================

lower = np.array([0, 30, 40])
upper = np.array([50, 255, 255])

mask_hsv = cv2.inRange(
    hsv,
    lower,
    upper
)

# =========================================================
# MORPHOLOGY
# =========================================================

kernel = np.ones((5,5), np.uint8)

mask_clean = cv2.morphologyEx(
    mask_hsv,
    cv2.MORPH_OPEN,
    kernel
)

mask_clean = cv2.morphologyEx(
    mask_clean,
    cv2.MORPH_CLOSE,
    kernel
)

# =========================================================
# REMOVE SMALL OBJECT
# =========================================================

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(
    mask_clean,
    connectivity=8
)

filtered_mask = np.zeros_like(mask_clean)

MIN_AREA = 40

for i in range(1, num_labels):

    area = stats[i, cv2.CC_STAT_AREA]

    if area > MIN_AREA:

        filtered_mask[labels == i] = 255

# =========================================================
# HSV DENSITY
# =========================================================

white_pixels = np.sum(filtered_mask > 0)

total_pixels = (
    filtered_mask.shape[0]
    *
    filtered_mask.shape[1]
)

hsv_density = white_pixels / total_pixels

hsv_percent = hsv_density * 100

# =========================================================
# HSV RESULT IMAGE
# =========================================================

final_rgb = cv2.cvtColor(
    final_preprocess,
    cv2.COLOR_BGR2RGB
)

hsv_result = cv2.bitwise_and(
    final_rgb,
    final_rgb,
    mask=filtered_mask
)

# =========================================================
# =========================================================
# 3. HYBRID DECISION
# =========================================================
# =========================================================

if yolo_percent < 40:

    final_density = yolo_percent
    method_used = "YOLO"

    final_image = yolo_result

else:

    final_density = hsv_percent
    method_used = "HSV"

    final_image = hsv_result

# =========================================================
# CATEGORY
# =========================================================

if final_density < 10:

    category = "Sangat Rendah"

elif final_density < 20:

    category = "Rendah"

elif final_density < 30:

    category = "Sedang"

elif final_density < 40:

    category = "Padat"

else:

    category = "Sangat Padat"

# =========================================================
# SAVE FINAL RESULT IMAGE
# =========================================================

filename = datetime.now().strftime("%Y%m%d_%H%M%S")

output_image_path = f"storage/app/public/maggotresult/result_{filename}.jpg"

final_bgr = cv2.cvtColor(
    final_image,
    cv2.COLOR_RGB2BGR
)

cv2.imwrite(
    output_image_path,
    final_bgr
)

# =========================================================
# FINAL JSON OUTPUT
# =========================================================

result = {

    "status": "success",

    "density": round(final_density, 2),

    "category": category,

    "method": method_used,

    "yolo_density": round(yolo_percent, 2),

    "hsv_density": round(hsv_percent, 2),

    "total_detection": total_detection,
}

print(json.dumps(result))
