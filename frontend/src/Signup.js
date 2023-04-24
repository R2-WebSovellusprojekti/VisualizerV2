import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './Styles.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const SERVER_ADDRESS = 'http://localhost:5000/api/signup';

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setUsernameError('');
    setSuccessMessage('');
  }
  function handleFocus() {
    setUsernameError('');
  }

  function handleFocus() {
    setUsernameError('');
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim()) {
      setUsernameError('Username cannot be empty!');
      setPassword('');
      return;
    }

    if (password.length < 8) {
      setUsernameError('Password must be at least 8 characters long!');
      setPassword('');
      return;
    }

    setIsSubmitting(true);

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) throw err;

        const data = { username, password: hash };

        fetch(SERVER_ADDRESS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => {
            if (response.ok) {
              setIsSubmitting(false);
              setSuccessMessage('User added successfully!');
              setUsername('');
              setPassword('');
              window.location.href = '/';
            } else if (response.status === 409) {
              setUsernameError('Username is already taken');
              setIsSubmitting(false);
              setUsername('');
              setPassword('');
              throw new Error('Username is already taken');
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            setIsSubmitting(false);
          });
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style ={{ display: 'flex', flexDirection: 'column' }}>
        <label className='dropdown-txt'>
          Choose your username
          <input type="text" className='dropdown-txt2' value={username} onChange={handleUsernameChange} onFocus={handleFocus}/>
        </label>
        <label className='dropdown-txt'>
          Choose your password
          <input type="password" className='dropdown-txt2' value={password} onChange={handlePasswordChange} onFocus={handleFocus}/>
        </label>
        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>} {/* Display the password error message */}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display the success message */}
      </div>
      {isSubmitting ? (
        <button type="submit" className='dropdown-btn' disabled>SUBMITTING...</button>
      ) : (
        <button type="submit" className='dropdown-btn2'>SIGN UP</button>
      )}
    </form>
  );
}



export default SignupForm;
