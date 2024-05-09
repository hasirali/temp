import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import './story.css';
import './Feed.css';

export default function Story({ Image, profile, title }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleImageClose = () => {
    setIsImageOpen(false);
  };

  return (
    <>
      <div
        className="story"
        style={{ backgroundImage: `url(${Image})` }}
        onClick={handleImageClick}
      >
        <Avatar className="story__avatar" src={profile} />
        <h4>{title}</h4>
      </div>
      {isImageOpen && (
        <div className="story__image-modal" onClick={handleImageClose}>
          <img src={Image} alt={title} />
        </div>
      )}
    </>
  );
}
