import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteUserForm from './DeleteUser';

describe('DeleteUserForm', () => {
  test('renders without errors', () => {
    render(<DeleteUserForm />);
  });

  test('displays a prompt when delete button is clicked', () => {
    render(<DeleteUserForm />);
    const deleteButton = screen.getByTestId('deleteuser-button');
    fireEvent.click(deleteButton);
    const promptText = screen.getByText('Are you sure you want to delete this account?');
    expect(promptText).toBeInTheDocument();
  });

  test('submits form when username is entered and "Delete" is clicked', async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;
    localStorage.setItem('token', '12345');
    localStorage.setItem('username', 'testuser');
    render(<DeleteUserForm />);
    const deleteButton = screen.getByTestId('deleteuser-button');
    fireEvent.click(deleteButton);
    const usernameInput = screen.getByLabelText(/Enter your username to delete/i);
    const deleteConfirmButton = screen.getByText('DELETE');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(deleteConfirmButton);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/deleteuser', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser' }),
    });
    await screen.findByText('User deleted successfully!');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
  });

  test('does not submit form if username is not entered', () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;
    localStorage.setItem('username', 'testuser');
    render(<DeleteUserForm />);
    const deleteButton = screen.getByTestId('deleteuser-button');
    fireEvent.click(deleteButton);
    const usernameInput = screen.getByLabelText(/Enter your username to delete/i);
    const deleteConfirmButton = screen.getByText('DELETE');
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.click(deleteConfirmButton);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText('Username cannot be empty!')).toBeInTheDocument();
  });

  test('does not submit form if username is not the same as the current user', () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;
    localStorage.setItem('username', 'testuser');
    render(<DeleteUserForm />);
    const deleteButton = screen.getByTestId('deleteuser-button');
    fireEvent.click(deleteButton);
    const usernameInput = screen.getByLabelText(/Enter your username to delete/i);
    const deleteConfirmButton = screen.getByText('DELETE');
    fireEvent.change(usernameInput, { target: { value: 'otheruser' } });
    fireEvent.click(deleteConfirmButton);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText('You can only delete your own account!')).toBeInTheDocument();
  });
});
