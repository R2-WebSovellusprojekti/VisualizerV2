import React, { useEffect, useState, useRef } from 'react';

function DeleteUserForm() {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const SERVER_ADDRESS = 'http://localhost:5000/api/deleteuser';
  const token = localStorage.getItem('token');
  const dialogRef = useRef(null);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleUsernameFocus() {
    setErrorMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!localStorage.getItem('token') && !localStorage.getItem('username')) {
      alert('You must be signed in to delete a user!');
      return;
    }

    if (!username.trim()) {
      setErrorMessage('Username cannot be empty!');
      setUsername('');
      return;
    } else {
      setErrorMessage('');
    }

    if (username !== localStorage.getItem('username')) {
      setErrorMessage('You can only delete your own account!');
      setUsername('');
      return;
    } else {
      setErrorMessage('');
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
            setTimeout(() => {
              setSuccessMessage('');
              window.location.href = '/';
            }, 2000);
          } else if (response.status === 401) {
            setIsAuthError(true);
            setAuthErrorMessage('You are not authorized to perform this action!');
            setIsSubmitting(false);
          } else if (response.status === 404) {
            setUsernameError('Username not found!');
            setIsSubmitting(false);
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
        <button className="deleteuser-btn" data-testid="deleteuser-button" type="button" onClick={() => setIsPromptOpen(true)}>DELETE ACCOUNT</button>
      )}
      {isPromptOpen && (
        <div className="confirm-dialog" ref={dialogRef}>
          <div className="confirm-dialog-content">
            <h2 style={{ marginBottom: '0%', color: 'red' }}>DELETE ACCOUNT</h2>
            <p style={{ marginTop: '-1%', marginBottom: '10px', fontSize: '18px' }}>Are you sure you want to delete this account?</p>
            <div className="confirm-dialog-input">
              <label htmlFor="username">Enter your username to delete</label>
              <input type="text" id="username" value={username} onChange={handleUsernameChange} onFocus={handleUsernameFocus}/>
            </div>
            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {isAuthError && <p style={{ color: 'red' }}>{authErrorMessage}</p>}
            {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
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
