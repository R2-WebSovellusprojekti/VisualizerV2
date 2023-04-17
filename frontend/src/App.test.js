import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import ProfileButton from './ProfileButton';
import SignOutButton from './SignOutButton';
import DeleteUser from './DeleteUser';

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

test('renders the "Profile" button when logged in', () => {
  const isAuthenticated = true;
  render(<ProfileButton isAuthenticated={isAuthenticated} />);
  const profileButton = screen.getByTestId('profile-button');
  expect(profileButton).toBeEnabled();
});

test('renders the SIGN OUT button when logged in', () => {
  const isAuthenticated = true;
  render(<SignOutButton isAuthenticated={isAuthenticated} />);
  const signoutButton = screen.getByTestId('signout-button');
  expect(signoutButton).toBeEnabled();
});

test('renders the DELETE ACCOUNT button when logged in', () => {
  const isAuthenticated = true;
  render(<DeleteUser isAuthenticated={isAuthenticated} />);
  const deleteuserButton = screen.getByTestId('deleteuser-button');
  expect(deleteuserButton).toBeEnabled();
});

test('does not render "Profile" button when user is not authenticated', () => {
  const isAuthenticated = false;
  render(<App isAuthenticated={isAuthenticated} />);
  const profileButton = screen.queryByTestId('profile-button');
  expect(profileButton).not.toBeInTheDocument();
});

});
