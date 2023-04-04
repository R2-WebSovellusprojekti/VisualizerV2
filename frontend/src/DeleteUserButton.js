/*import React, { useState } from 'react';
=======
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

function DeleteUserButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const { user, logout } = useAuth();

  const handleDeleteClick = async () => {
    try {
        console.log(user);
      const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

      if (confirmDelete) {
        setIsDeleting(true);
        const response = await fetch('http://localhost:5000/api/deleteuser', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ 
            password: prompt('Enter your password to confirm account deletion.'),
            userId: user.userId // pass the user ID here
          })
        });

        if (response.ok) {
          await logout();
        } else {
          const error = await response.json();
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.error(error);
      setDeleteError(error.message);
      setIsDeleting(false);
      console.log()
    }
  };

  return (
    <div>
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
      <button className='deleteuser-btn' disabled={isDeleting} onClick={handleDeleteClick}>
        {isDeleting ? 'DELETING ACCOUNT...' : 'DELETE ACCOUNT'}
      <button disabled={isDeleting} onClick={handleDeleteClick}>
        {isDeleting ? 'Deleting Account...' : 'Delete Account'}
      </button>
    </div>
  );
}

export default DeleteUserButton;*/




/*import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import './App.css';

function DeleteUserButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const { user, logout } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeleteClick = async () => {
    try {
      setShowConfirmDialog(true);
    } catch (error) {
      console.error(error);
      setDeleteError(error.message);
      setIsDeleting(false);
    }
  };

  const handleConfirmDeleteClick = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch('http://localhost:5000/api/deleteuser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          password: prompt('Enter your password to confirm account deletion.'),
          userId: user.userId, // pass the user ID here
        }),
      });

      if (response.ok) {
        await logout();
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(error);
      setDeleteError(error.message);
      setIsDeleting(false);
    }
  };

  const handleCancelDeleteClick = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div>
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
      <button className="deleteuser-btn" disabled={isDeleting} onClick={handleDeleteClick}>
        {isDeleting ? 'DELETING ACCOUNT...' : 'DELETE ACCOUNT'}
      </button>
      {showConfirmDialog && (
        <div className="confirm-dialog">
          <div className="confirm-dialog-content">
            <h2>Confirm Account Deletion</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="confirm-dialog-buttons">
              <button className="confirm-dialog-confirm" onClick={handleConfirmDeleteClick}>
                Confirm
              </button>
              <button className="confirm-dialog-cancel" onClick={handleCancelDeleteClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteUserButton;*/
