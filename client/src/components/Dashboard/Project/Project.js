import React, { useState } from 'react';
import './Project.css';

const Project = ({ title, imageUrl }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Perform any additional logic or navigation here
  };

  return (
    <div className="project">
      <div className="secondary" onClick={handleClick}>
        <div className="project-title">
          <h3>{title}</h3>
        </div>
        <img className="project-image" src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export default Project;
