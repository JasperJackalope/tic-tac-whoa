import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './dashboard.css'; // import the CSS file
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

// This is the best Dashboard
const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || data?.user || {};

  return (
    <div className="dashboard">
      <Navigation />
      <section className="portfolio container text-cente padding">
        <h3>Welcome {user.username}!</h3>
        <Link to="/game">
          <button>Start New Game</button>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
