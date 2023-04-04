import React, { useState } from 'react';
// import bcrypt from 'bcryptjs';

function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const SERVER_ADDRESS = 'http://localhost:5000/api/signin';

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setUsernameError('');
    setSuccessMessage('');
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim()) {
      alert('Username cannot be empty!');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setIsSubmitting(true);

    const data = { username, password };

    fetch(SERVER_ADDRESS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(async response => {
        if (response.ok) {
          const { token } = await response.json();
          const username = data.username;

            localStorage.clear(); // Clear local storage
            localStorage.setItem('token', token); // Store token in local storage
            localStorage.setItem('username', username); // Store username in local storage

          setIsSubmitting(false);
          setSuccessMessage('User signed in successfully!');
          setUsername('');
          setPassword('');
          //Redirect to front page
          window.location.href = '/';
        } else if (response.status === 401) {
          setUsernameError('Invalid username or password');
          setIsSubmitting(false);
          setUsername('');
          setPassword('');
          throw new Error('Invalid username or password');
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsSubmitting(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label className='dropdown-txt'>
          Username
          <input type="text" className='dropdown-txt' value={username} onChange={handleUsernameChange} />
        </label>
        <label className='dropdown-txt'>
          Password
          <input type="password" className='dropdown-txt' value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      {isSubmitting ? (
        <button type="submit" className='dropdown-btn' disabled>SIGNING IN...</button>
      ) : (
        <button type="submit" className='dropdown-btn'>LOG IN</button>
      )}
      {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}

export default SignInForm;
