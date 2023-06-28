// MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function MainPage({ user, handleLogout }) {
  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.firstName}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/game">
            <button>Start a Game</button>
          </Link>
        </div>
      ) : (
        <p>Please log in to access the main page.</p>
      )}
    </div>
  );
}

export default MainPage;
