import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from './Signup';
import SignInForm from './Signin';
import { By, until } from 'selenium-webdriver';


//-------------------THIS TEST NEEDS TO BE RAN TWO TIMES TO PASS-------------------//

describe('SignInForm', () => {

  test('displays error message for invalid credentials', async () => {
    render(<SignInForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    const testUsername = 'invaliduser';
    const testPassword = 'invalidpassword';

    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    fireEvent.click(submitButton);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/invalid username or password/i);
    expect(errorMessage).toBeInTheDocument();

    // Ensure local storage was not updated
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
  });
});

describe('SignupForm', () => {

  test('creates a new user', async () => {
    render(<SignupForm />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    const testUsername = 'testuser';
    const testPassword = 'testpassword';

    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    fireEvent.click(submitButton);

  });
});

describe('SignInForm', () => {

  test('allows user to sign in', async () => {
    render(<SignInForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    const testUsername = 'testuser';
    const testPassword = 'testpassword';

    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    fireEvent.click(submitButton);

    // Wait for the success message to appear
    const successMessage = await screen.findByText(/signed in successfully/i);

    expect(successMessage).toBeInTheDocument();

    // Ensure local storage was updated
    expect(localStorage.getItem('token')).not.toBeNull();
    expect(localStorage.getItem('username')).toEqual(testUsername);
  });
});
