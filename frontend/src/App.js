import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SigninButton from './SigninButton';
import SignupButton from './SignupButton';
import ProfileButton from './ProfileButton';
import React, { useState, useEffect } from 'react';
import './Styles.css'
import N1Charts from './N1Charts';
import N2Charts from './N2Charts';
import CreateChartButton from './CreateChartButton';
import CreateChart from './CreateChart';
import DeleteChartButton from './DeleteChartButton';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewChartCreated, setIsNewChartCreated] = useState(false);

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

  const handleCreateChartClick = () => {
    setIsNewChartCreated(true);
  };

  const handleDeleteChartClick = () => {
    setIsNewChartCreated(false);
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
        <div className="chart-box">
            <N1Charts />
        </div>
        <div className="chart-box">
          <N2Charts />
        </div>
        <div className="chart-box">
          {isNewChartCreated ? (
            <>
            <CreateChart />
            <DeleteChartButton onClick={handleDeleteChartClick} />
            </>
          ) : (
          <CreateChartButton onClick={handleCreateChartClick} />
          )}
        </div>
        <div className="footer">
          <a href="https://github.com/R2-WebSovellusprojekti/VisualizerV2" target="_blank" rel="noopener noreferrer" data-testid="github-button">
            <img className="github-logo" src="/github-mark-white.png" alt="" />
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;