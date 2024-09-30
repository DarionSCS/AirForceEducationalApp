import React from "react";
import "../../styles/components/_newsCard.css"; 

export default function Card({ imageUrl, title, content }) {
  return (
    <div className="card">
      <img className="card-image" src={imageUrl} alt="News" />
      <div className="card-body">
        <div className="card-title">{title}</div>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
}
