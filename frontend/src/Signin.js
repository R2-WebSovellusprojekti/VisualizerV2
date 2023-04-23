import React, { useState } from 'react';

function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const SERVER_ADDRESS = 'postgres://r2:So89P9cm37yaR22nqNjyktWJLSB4Ywo7@dpg-cgi5v4seoogvqrjl6amg-a/r2db/api/signin';

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setUsernameError('');
    setSuccessMessage('');
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setPasswordError('');
    setSuccessMessage('');
  }

  function handleFocus() {
    setUsernameError('');
    setPasswordError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim()) {
      setUsernameError('Username cannot be empty!');
      setPassword('');
      setUsername('');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long!');
      setPassword('');
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
          setSuccessMessage('Signed in successfully!');
          setUsername('');
          setPassword('');
          //Redirect to front page
          window.location.href = '/';
        } else if (response.status === 401) {
          setUsernameError('Invalid username or password');
          setIsSubmitting(false);
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
          <input type="text" className='dropdown-txt2' value={username} onChange={handleUsernameChange} onFocus={handleFocus} />
        </label>
        <label className='dropdown-txt'>
          Password
          <input type="password" className='dropdown-txt2' value={password} onChange={handlePasswordChange} onFocus={handleFocus}/>
        </label>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
      </div>
      {isSubmitting ? (
        <button type="submit" className='dropdown-btn' disabled>SIGNING IN...</button>
      ) : (
        <button type="submit" className='dropdown-btn'>LOG IN</button>
      )}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}

export default SignInForm;