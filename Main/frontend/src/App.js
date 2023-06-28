import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import WelcomePage from './components/WelcomePage';
import MainPage from './components/MainPage';
import TicTacToeGame from './components/TicTacToeGame';

function App() {
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = async (email, password) => {
    try {
      // Make an API call to authenticate the user
      const response = await axios.post('/api/login', { email, password });
      // Set the user in the state
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Make an API call to log out the user
    // Clear user from state and perform any other necessary cleanup
    setUser(null);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomePage handleLogin={handleLogin} user={user} />
        </Route>
        <Route exact path="/main">
          <MainPage user={user} handleLogout={handleLogout} />
        </Route>
        <Route exact path="/game">
          <TicTacToeGame />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
