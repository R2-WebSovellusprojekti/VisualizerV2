import React, { useEffect, useState, useRef } from 'react';

function DeleteUserForm() {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const SERVER_ADDRESS = 'http://localhost:5000/api/deleteuser';
  const token = localStorage.getItem('token');
  const dialogRef = useRef(null);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if(!localStorage.getItem('token') && !localStorage.getItem('username')) {
        alert('You must be signed in to delete a user!');
        return;
    }

    if (!username.trim()) {
        alert('Username cannot be empty!');
        return;
      }

    if (username !== localStorage.getItem('username')) {
        alert('You can only delete your own account!');
        return;
        }

    setIsSubmitting(true);

    
    const data = { username };

    if (token && username) {
    fetch(SERVER_ADDRESS, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(async response => {
        if (response.ok) {
            localStorage.clear(); // Clear local storage
          setIsSubmitting(false);
          setSuccessMessage('User deleted successfully!');
          setUsername('');
          window.location.href = '/';
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsSubmitting(false);
      });
  } else {
    setIsSubmitting(false);
    }
    }
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsPromptOpen(false);
      }
    }
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }, []);

    return (
      <form onSubmit={handleSubmit}>
        {isSubmitting ? (
          <button className="deleteuser-btn" type="submit" disabled>DELETING...</button>
        ) : (
          <button className="deleteuser-btn" type="button" onClick={() => setIsPromptOpen(true)}>DELETE ACCOUNT</button>
        )}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {isPromptOpen && (
          <div className="confirm-dialog" ref={dialogRef}>
            <div className="confirm-dialog-content">
              <h2 style={{ marginBottom: '0%', color: 'red' }}>DELETE ACCOUNT</h2>
              <p style={{ marginTop: '-1%', marginBottom: '10px', fontSize: '18px' }}>Are you sure you want to delete this account?</p>
              <div className="confirm-dialog-input">
                <label htmlFor="username">Enter your username to delete</label>
                  <input type="text" id="username" value={username} onChange={handleUsernameChange} />
              </div>
              <div className="confirm-dialog-buttons" style={{ marginTop: '20px' }}>
                <button className="confirm-dialog-confirm" type="submit">DELETE</button>
                <button className="confirm-dialog-cancel" type="button" onClick={() => setIsPromptOpen(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        )}
      </form>
    );
}

export default DeleteUserForm;
