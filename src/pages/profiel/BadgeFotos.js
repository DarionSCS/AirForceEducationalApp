// BadgeImages.js
import React, { useEffect, useState } from 'react';

export default function BadgeFotos() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Replace this with your actual database fetch call
    fetch('your-database-url')
      .then(response => response.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image.url} alt={image.description} />
      ))}
    </div>
  );
}