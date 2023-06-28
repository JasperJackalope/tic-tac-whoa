import React from 'react';
import Habit from '../Habit/Habit';
import Navigation from '../Navigation/Navigation';
import prj1 from '../../images/today.jpg';
import prj2 from '../../images/week.jpg';
import prj3 from '../../images/month.jpg';
import prj4 from '../../images/history.jpg';
import './Today.css'; // import the CSS file

const Today  = () => {
  // Actual projects data
  // Add my prtojects here:
  const habits = [
    { title: 'Excerise', imageUrl: prj1},
    { title: 'Mental', imageUrl: prj2},
    { title: 'Nutrition', imageUrl: prj3},
    { title: 'Fun', imageUrl: prj4},
  ];

  return (
    <div>
      <Navigation />
      <section className="portfolio">
        <div className="projects-container">
          {habits.map((habit, index) => (
            <Habit key={index} {...habit} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Today;