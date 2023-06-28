import React from 'react';
import './Navigation.css'; // Import the CSS file
// import '../../App2.css';

function NavigationBar() {
  return (
    <nav className="nav"> {/* Add the class name to the nav */}
      <ul>
        <li>
          <a className="nav-item" href="/dashboard">Dashboard</a> {/* Add the class name to the anchor */}
        </li>
        <li>
          <a className="nav-item" href="/">Log Out</a> {/* Add the class name to the anchor */}
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;