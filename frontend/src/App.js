/*import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SigninButton from './SigninButton';
import SignupButton from './SignupButton';
import SigninForm from './Signin';
import SignupForm from './Signup';
import DeleteUserForm from './DeleteUser';
import SignOutButton from './SignOutButton';

import React from 'react';


import './Styles.css'

function App() {
  const handleSignupClick = () => {
    console.log('Signup clicked');
  };

  const handleSigninClick = () => {
    console.log('Signin clicked');
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <NavLink to="/" className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className='title'>R2 Visualizer Project</h1>
          </NavLink>

          <ul>
            <li>
              <SigninButton onClick={handleSigninClick}/>
            </li>
            <li>
              <SignupButton onClick={handleSignupClick}/>
            </li>
            <li>
              <DeleteUserButton />
            </li>
          </ul>
        </nav>

        <header className="App-header">
          <div>
            <Routes>
              <Route path="/" element={<p>Work very much in progress...</p>} />
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </div>
          <a
            className="App-link"
            href="https://github.com/R2-WebSovellusprojekti/R2-WebSovellusprojekti"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkki projektin GitHubiin
          </a>
        </header>
      </div>
    </Router>
  );
}

export default App;*/
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SigninButton from './SigninButton';
import SignupButton from './SignupButton';
import SigninForm from './Signin';
import SignupForm from './Signup';
import ProfileButton from './ProfileButton';
import React, { useState, useEffect } from 'react';
import './Styles.css'
import N1Charts from './N1Charts';
import N2Charts from './N2Charts';
import N3Charts from './N3Charts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSignupClick = () => {
    console.log('Signup clicked');
  };

  const handleSigninClick = () => {
    console.log('Signin clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <NavLink to="/" className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className='title' >R2 Visualizer Project</h1>
          </NavLink>

          <ul>
            {isAuthenticated ? (
              <li>
                <ProfileButton onClick={handleProfileClick} />
              </li>
            ) : (
              <>
                <li>
                  <SigninButton onClick={handleSigninClick} />
                </li>
                <li>
                  <SignupButton onClick={handleSignupClick} />
                </li>
              </>
            )}
          </ul>
        </nav>
        <N1Charts />
        <header className="App-header">
          <div>
            <Routes>
              <Route path="/" element={<p>Work very much in progress...</p>} />
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </div>
          <a
            className="App-link"
            href="https://github.com/R2-WebSovellusprojekti/R2-WebSovellusprojekti"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkki projektin GitHubiin
          </a>
        </header>
      </div>
    </Router>
  );
}

export default App;
