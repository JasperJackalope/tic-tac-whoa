import React from 'react';
import Project from '../Project/Project';
import Navigation from '../Navigation/Navigation';
import prj1 from '../../images/today.jpg';
import prj2 from '../../images/week.jpg';
import prj3 from '../../images/month.jpg';
import prj4 from '../../images/history.jpg';
import './Dashboard.css'; // import the CSS file

const Dashboard = () => {
  // Actual projects data
  // Add my prtojects here:
  const projects = [
    { title: 'Today', imageUrl: prj1, deployedUrl: 'https://samanthaahn.github.io/fiesta-event/', repoUrl: 'https://github.com/samanthaahn/fiesta-event'},
    { title: 'This Week', imageUrl: prj2, deployedUrl: 'https://lit-ocean-94336.herokuapp.com/logins', repoUrl: 'https://github.com/jjjgm/gg-get-icecream.git' },
    { title: 'This Month', imageUrl: prj3, deployedUrl: 'https://www.google.com', repoUrl: 'https://github.com/samanthaahn/magic-list' },
    { title: 'History', imageUrl: prj4, deployedUrl: 'https://drive.google.com/file/d/1GnBkXZxLF4mGEsP-BnqUTsCODmaGvqWE/view?usp=share_link', repoUrl: 'https://github.com/JasperJackalope/ecommerce_back_end' },
  ];

  return (
    <div className="mainproject">
      <Navigation />
      <section className="portfolio">
        <h2>Welcome back, USERNAME!</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;