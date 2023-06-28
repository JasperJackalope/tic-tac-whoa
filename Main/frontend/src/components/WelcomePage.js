// WelcomePage.js
import React, { useState } from 'react';
import axios from 'axios';

function WelcomePage({ handleLogin, user }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to sign up the user
      const response = await axios.post('/api/signup', {
        firstName,
        email,
        password,
      });
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to log in the user
      await handleLogin(email, password);
      // Handle the response as needed
      console.log('Logged in successfully');
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Welcome to the Game App!</h1>
      {user ? (
        <h2>Welcome, {user.firstName}!</h2>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h2>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default WelcomePage;
