import React, { useState } from "react";
import "./imageUpload.css"; // Import the CSS file
import { ColorRing } from "react-loader-spinner";

function ImageUpload() {
  const [selectedFiles, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [responseImage, setResponseImage] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFile(files);
    setPreviewUrl(true);
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;
    setIsLoading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`image${i}`, selectedFiles[i]);
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/detect", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResponseImage(data.images);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setPreviewUrl(false);
    setIsLoading(false);
  };

  return (
    <div className="containerBox">
      <div className="uploadBox">
        <div className="previewContainer">
          {previewUrl ? (
            <div>{selectedFiles.length} Selected File</div>
          ) : (
            <div className="uploadArea">
              <input
                type="file"
                className="input"
                onChange={handleFileChange}
                accept="image/*"
                multiple="multiple"
              />
              <div>
                Drag files here or <span className="browseText">browse</span>
              </div>
            </div>
          )}
        </div>
        <button className="uploadButton" onClick={handleUpload}>
          SAVE
        </button>
      </div>
      {isLoading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#5a5a5a"]}
        />
      )}
      <div className="responseImages">
        {!isLoading &&
          responseImage.map((image, idx) => {
            return (
              <div className="responseImageContainer">
                <img
                  key={idx}
                  src={"data:image/jpeg;base64," + image}
                  className="responseImage"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ImageUpload;
