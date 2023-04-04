import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './Signup';
import './Styles.css';

function SignupButton() {
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.className !== 'signup-btn'
    ) {
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
    <div className="signup-container">
      <button className="signup-btn" onClick={handleButtonClick}>
        SIGN UP
      </button>
      {isDropdownOpen && (
        <div className="signup-dropdown" ref={dropdownRef}>
          <SignUpForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
}

export default SignupButton;


/*
function SignupButton() {
  const handleButtonClick = () => {
    window.location.href = '/signup';
  };

  return (
    <button onClick={handleButtonClick}>
      GO TO SIGN UP
    </button>
  );
}
*/
/* 
function SignupButton(props) {
   return (
     <button onClick={props.onClick}>Sign up</button>
   );
 }


export default SignupButton;
*/
