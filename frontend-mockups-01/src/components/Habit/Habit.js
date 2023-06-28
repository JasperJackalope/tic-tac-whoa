import React from 'react';
import './Habit.css';

const Habit = ({ title, imageUrl, deployedUrl, repoUrl }) => {
  return (
    <div className="project">
      <a href={deployedUrl} target="_blank" rel="noreferrer">
        <div className="secondary">
          <div className="project-title">
            <h3>{title}</h3>
          </div>
          <img className="project-image" src={imageUrl} alt={title} />
        </div>
      </a>
    </div>
  );
};

export default Habit;