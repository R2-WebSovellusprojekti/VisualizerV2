import React, { useState } from 'react';
import './Styles.css';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog-content">
        <h2 style={{ marginBottom: '0%' }}>Are you sure you want to sign out?</h2>
        <p style={{ marginTop: '-1%', marginBottom: '10px' }}>{message}</p>
        <div className="confirm-dialog-buttons" style={{ marginTop: '20px' }}>
          <button className="confirm-dialog-confirm" onClick={onConfirm}>Yes</button>
          <button className="confirm-dialog-cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

function SignOutButton() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleSignOut() {
    setIsConfirmOpen(true);
  }

  function handleConfirm() {
    localStorage.clear(); // Clear local storage
    window.location.href = '/';
  }

  function handleCancel() {
    setIsConfirmOpen(false);
  }

  return (
    <>
      <button className='signout-btn' onClick={handleSignOut}>SIGN OUT</button>
      {isConfirmOpen && (
        <ConfirmationDialog
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default SignOutButton;
