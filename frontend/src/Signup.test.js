import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import SignupForm from './Signup';

describe('SignupForm', () => {
  beforeEach(() => {
    render(<SignupForm />);
  });
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the component without errors', () => {
    const form = screen.getByRole('textbox');
    expect(form).toBeInTheDocument();
  });

  it('displays an error message if the username is empty', async () => {
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/Username cannot be empty!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays an error message if the password is less than 8 characters', async () => {
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const passwordInput = screen.getByLabelText(/Choose your password/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: 'newuser' } });
    fireEvent.change(passwordInput, { target: { value: 'passwor' } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/Password must be at least 8 characters long!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays a success message and resets the form fields when a new user is successfully created', async () => {
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const passwordInput = screen.getByLabelText(/Choose your password/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: 'newuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(submitButton).not.toBeDisabled();

    const successMessage = screen.getByText(/User added successfully!/i);
    expect(successMessage).toBeInTheDocument();
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  it('displays an error message if the username is already taken', async () => {
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const passwordInput = screen.getByLabelText(/Choose your password/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: 'existinguser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 409,
        json: () => Promise.resolve({}),
      })
    );

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(submitButton).not.toBeDisabled();

    const errorMessage = screen.queryByText(/username is already taken/i);

    expect(errorMessage).toBeInTheDocument();
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

});
