
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './Styles.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to keep track of whether the form is submitting
  const [successMessage, setSuccessMessage] = useState('');

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

    setIsSubmitting(true); // Set the form to submitting state

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) throw err;

        const data = { username, password: hash };

        fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => {
            if (response.ok) {
              setIsSubmitting(false); // Set the form to non-submitting state
              setSuccessMessage('User added successfully!'); // Set the success message
              setUsername(''); // Reset the form fields
              setPassword('');
              //Redirect to front page
              window.location.href = '/';
            } else if (response.status === 409) {
              setUsernameError('Username is already taken');
              setIsSubmitting(false); // Set the form to non-submitting state
              setUsername(''); // Reset the form fields
              setPassword('');
              throw new Error('Username is already taken');
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            setIsSubmitting(false); // Set the form to non-submitting state
          });
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style ={{ display: 'flex', flexDirection: 'column' }}>
      <label className='dropdown-txt'>
        Choose your username
        <input type="text" className='dropdown-txt' value={username} onChange={handleUsernameChange} />
{/*        {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}         */}
      </label>
      <label className='dropdown-txt'>
        Choose your password
        <input type="password" className='dropdown-txt' value={password} onChange={handlePasswordChange} />
      </label>
      </div>
      {isSubmitting ? (
        <button type="submit" className='dropdown-btn' disabled>SUBMITTING...</button>
      ) : (
        <button type="submit" className='dropdown-btn2'>SIGN UP</button>
      )}
      {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>} {/* Display the username error message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display the success message */}
    </form>
  );
}

export default SignupForm;
