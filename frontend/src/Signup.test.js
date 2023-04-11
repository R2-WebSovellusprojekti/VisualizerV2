import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import SignupForm from './Signup';

describe('SignupForm', () => {
  it('submits the form when username and password are valid', async () => {
    const mockResponse = { status: 200 };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      ok: true,
      status: 200,
    });
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise);

    const { getByLabelText, getByText } = render(<SignupForm />);

    fireEvent.change(getByLabelText(/choose your username/i), {
      target: { value: 'johndoe' },
    });

    fireEvent.change(getByLabelText(/choose your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(getByText(/sign up/i));

    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'johndoe', password: expect.any(String) }),
    });

    expect(getByText(/user added successfully/i)).toBeInTheDocument();
  });

//-----------TOIMII----------------
test('renders a success message on successful form submission', async () => {
  const mockResponse = { status: 201 };
  jest.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockResponse),
    ok: true,
  });
  const { getByText, getByLabelText } = render(<SignupForm />);

  // Fill out and submit the form
  const usernameInput = getByLabelText('Choose your username');
  const passwordInput = getByLabelText('Choose your password');
  const submitButton = getByText('SIGN UP');
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  // Wait for the success message to appear
  await waitFor(() => {
    expect(getByText('User added successfully!')).toBeInTheDocument();
  });
});

  test('displays an error message if username is already taken', async () => {
    const mockResponse = { status: 409 };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      ok: false,
      status: 409,
    });
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise);

    const { getByLabelText, getByText } = render(<SignupForm />);

    fireEvent.change(getByLabelText(/choose your username/i), {
      target: { value: 'johndoe' },
    });

    fireEvent.change(getByLabelText(/choose your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(getByText(/sign up/i));

    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

    expect(getByText(/username is already taken/i)).toBeInTheDocument();
  });
//---------------------------

  it('displays an error message if password is too short', async () => {
    const { getByLabelText, getByText } = render(<SignupForm />);

    fireEvent.change(getByLabelText(/choose your username/i), {
      target: { value: 'johndoe' },
    });

    fireEvent.change(getByLabelText(/choose your password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(getByText(/sign up/i));

    expect(getByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
  });

  it('displays an error message if username is empty', async () => {
    const { getByLabelText, getByText } = render(<SignupForm />);

    fireEvent.change(getByLabelText(/choose your username/i), {
      target: { value: '' },
    });

    fireEvent.change(getByLabelText(/choose your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(getByText(/sign up/i));

    expect(getByText(/username cannot be empty/i)).toBeInTheDocument();
  });
});




describe('SignupForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should display error message if username is empty', async () => {
    render(<SignupForm />);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Username cannot be empty/i)).toBeInTheDocument();
    });
  });

  it('should display error message if password is too short', async () => {
    render(<SignupForm />);
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const passwordInput = screen.getByLabelText(/Choose your password/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
    });
  });

  it('should submit the form with valid inputs', async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));
    render(<SignupForm />);
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const passwordInput = screen.getByLabelText(/Choose your password/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost:5000/api/signup');
      expect(fetch.mock.calls[0][1].method).toEqual('POST');
      expect(fetch.mock.calls[0][1].headers).toEqual({ 'Content-Type': 'application/json' });
      expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ username: 'testuser', password: expect.any(String) }));
      expect(screen.getByText(/User added successfully!/i)).toBeInTheDocument();
      expect(usernameInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  it('should display error message if username is already taken', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Username is already taken' }), { status: 409 });
    render(<SignupForm />);
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const passwordInput = screen.getByLabelText(/Choose your password/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(screen.getByText(/Username is already taken/i)).toBeInTheDocument();
      expect(usernameInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  it('should display error message if network response is not ok', async () => {
    fetch.mockResponseOnce(null, { status: 500 });
    render(<SignupForm />);
    const usernameInput = screen.getByLabelText(/Choose your username/i);
    const passwordInput = screen.getByLabelText(/Choose your password/i);
    const submitButton = screen.getByText(/SIGN UP/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        });
    });
    });

   
      
      test('displays an error message if the username is already taken', async () => {
        const mockResponse = { status: 409 };
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponse),
          ok: false,
        });
        const { getByText, getByLabelText } = render(<SignupForm />);
      
        // Fill out and submit the form
        const usernameInput = getByLabelText('Choose your username');
        const passwordInput = getByLabelText('Choose your password');
        const submitButton = getByText('SIGN UP');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
      
        // Wait for the error message to appear
        await waitFor(() => {
          expect(getByText('Username is already taken')).toBeInTheDocument();
        });
      });
      
      test('displays an error message if there is a network error', async () => {
        const mockError = new Error('Network response was not ok');
        jest.spyOn(window, 'fetch').mockRejectedValueOnce(mockError);
        const { getByText, getByLabelText } = render(<SignupForm />);
      
        // Fill out and submit the form
        const usernameInput = getByLabelText('Choose your username');
        const passwordInput = getByLabelText('Choose your password');
        const submitButton = getByText('SIGN UP');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
      
        // Wait for the error message to appear
        await waitFor(() => {
          expect(getByText('Network response was not ok')).toBeInTheDocument();
        });
      });
      

