import React, { useState, useRef, useEffect } from 'react';
import './Styles.css';
import DeleteUserForm from './DeleteUser';
import SignOutButton from './SignOutButton';

function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const username = localStorage.getItem('username');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleButtonClick = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="profile-container">
      <button type="button"
              className='profile-btn' 
              onClick={handleButtonClick}
              ref={buttonRef}>
        <img src="/pngegg.png" alt="" />
        <span style={{ fontSize: '20px', marginLeft: '0.5rem' }}>{username}</span>
      </button>
      {isOpen && (
        <div className="profile-dropdown" ref={dropdownRef}>
          <DeleteUserForm />
          <SignOutButton />
        </div>
      )}
      {/* Add an overlay to capture clicks and close the dropdown */}
      {isOpen && <div className="dropdown-overlay" onClick={handleButtonClick}></div>}
    </div>
  );
}

export default ProfileButton;