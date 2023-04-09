import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import ProfileButton from './ProfileButton';

describe('App', () => {

test('renders R2 Visualizer Project title', () => {
  render(<App />);
  const titleElement = screen.getByText(/R2 Visualizer Project/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders "LOG IN" button', () => {
  render(<App />);
  const loginButtonElement = screen.getByText(/LOG IN/i);
  expect(loginButtonElement).toBeInTheDocument();
});

test('renders "SIGN UP" button', () => {
  render(<App />);
  const signupButtonElement = screen.getByText(/SIGN UP/i);
  expect(signupButtonElement).toBeInTheDocument();
});

test('renders the correct user name on the "Profile" button when logged in', () => {
  const user = {
    username: 'Testi',
    password: 'testi123',
  };
  const isAuthenticated = true;
  render(<ProfileButton user={user} isAuthenticated={isAuthenticated} />);
/*
  // Find and click the "Login" button
  const loginButton = screen.getByText(/LOG IN/i);
  userEvent.click(loginButton);
*/
  // Find the "Profile" button and assert that it contains the correct user name
  const profileButton = screen.getByTestId('profile-button');
  expect(profileButton).toHaveTextContent(user.username);
});

test('does not render "Profile" button when user is not authenticated', () => {
  const isAuthenticated = false;
  render(<App isAuthenticated={isAuthenticated} />);
  const profileButtonElement = screen.queryByText(/Profile/i);
  expect(profileButtonElement).not.toBeInTheDocument();
});

});

/*
test('renders R2 Visualizer Project', () => {
  render(<App />);
  const linkElement = screen.getByText(/R2 Visualizer Project/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders LOG IN', () => {
  render(<App />);
  const buttonElement = screen.getByText(/LOG IN/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders SIGN UP', () => {
  render(<App />);
  const buttonElement = screen.getByText(/SIGN UP/i);
  expect(buttonElement).toBeInTheDocument();
});
*/
