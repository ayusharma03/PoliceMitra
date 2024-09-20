from flask import Flask, jsonify, request, send_file, render_template
from flask_cors import CORS, cross_origin
from ultralytics import YOLO
from PIL import Image, ImageDraw, ImageFont
import io
from base64 import encodebytes

app = Flask(__name__)
CORS(app)

# Load your custom YOLOv8 model
model = YOLO(r"D:\VsCode\PoliceMitraFull\webproject\best.pt")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test', methods = ['GET', 'POST']) 
def home(): 
    if(request.method == 'GET'): 
  
        data = "hello world"
        return jsonify({'data': data}) 

@app.route('/detect', methods=['POST'])
def detect():
    # Get the image from the request
    # if 'image' not in request.files:
    #     return {"error": "No image provided"}, 400
    
    # Create a list to store processed images
    processed_images = []

    # Iterate over each uploaded file
    for x in request.files:
        file = request.files[x]
        image = Image.open(io.BytesIO(file.read()))

        # Run YOLOv8 model on the image
        results = model(image)

        # Draw the results on the image
        draw = ImageDraw.Draw(image)
        font = ImageFont.load_default()

        for result in results:
            for box in result.boxes:
                bbox = [int(coord) for coord in box.xyxy[0]]
                class_name = model.names[int(box.cls)]
                confidence = float(box.conf)

                # Draw the bounding box
                draw.rectangle(bbox, outline="red", width=3)

                # Draw the class name and confidence
                text = f"{class_name}: {confidence:.2f}"
                text_size = draw.textbbox((bbox[0], bbox[1]), text, font=font)
                text_width = text_size[2] - text_size[0]
                text_height = text_size[3] - text_size[1]
                
                draw.rectangle([bbox[0], bbox[1] - text_height, bbox[0] + text_width, bbox[1]], fill="red")
                draw.text((bbox[0], bbox[1] - text_height), text, fill="white", font=font)

        # Save the processed image to a BytesIO object
        img_io = io.BytesIO()
        image.save(img_io, 'JPEG')
        img_io.seek(0)
        encoded_img = encodebytes(img_io.getvalue()).decode('ascii')

        # Append the processed image to the list
        processed_images.append(encoded_img)

    # Send the image back as a response
    return jsonify({"images": processed_images})

if __name__ == "__main__":
    app.run(debug=True)