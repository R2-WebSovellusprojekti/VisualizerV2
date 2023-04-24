import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignInForm from './Signin';

describe('SignInForm', () => {
  it('should render sign-in form', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LOG IN' })).toBeInTheDocument();
  });

  it('should show error when submitting empty form', async () => {
    render(<SignInForm />);
    fireEvent.submit(screen.getByRole('button', { name: 'LOG IN' }));
    const alert = await screen.findByText(/Username cannot be empty!/i);
    expect(alert).toBeInTheDocument();
  });

  it('should show error when submitting short password', async () => {
    render(<SignInForm />);
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.submit(screen.getByRole('button', { name: 'LOG IN' }));
    const alert = await screen.findByText(/Password must be at least 8 characters long!/i);
    expect(alert).toBeInTheDocument();
  });

  it('should show success message on successful sign-in', async () => {
    // mock fetch to return a successful response with token
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 'testtoken' }),
    });

    render(<SignInForm />);
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: 'LOG IN' }));

    // wait for success message to appear
    const successMessage = await screen.findByText(/Signed in successfully!/i);
    expect(successMessage).toBeInTheDocument();

    // check local storage for token and username
    expect(localStorage.getItem('token')).toEqual('testtoken');
    expect(localStorage.getItem('username')).toEqual('testuser');

    // restore fetch to its original implementation
    global.fetch.mockRestore();
  });

  it('should show error on failed sign-in', async () => {
    localStorage.clear(); // Clear local storage
    // mock fetch to return an error response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: 'Invalid username or password' }),
    });

    render(<SignInForm />);
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: 'LOG IN' }));

    // wait for error message to appear
    const errorMessage = await screen.findByText(/Invalid username or password/i);
    expect(errorMessage).toBeInTheDocument();

    // check local storage for cleared data
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();

    // restore fetch to its original implementation
    global.fetch.mockRestore();

  });
});
