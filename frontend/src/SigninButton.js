import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from './Signin';
import './Styles.css';

function SigninButton() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/signin');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.className !== 'signin-btn') {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="signin-container">
      <button className="signin-btn" onClick={handleButtonClick}>
        LOG IN
      </button>
      {isDropdownOpen && (
        <div className="signin-dropdown" ref={dropdownRef}>
          <SignInForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
}

export default SigninButton;