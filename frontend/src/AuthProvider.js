/*
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const user = localStorage.getItem('user');


function AuthProvider(props) {
  const [user, setUser] = useState(null);

  // Load user from local storage if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data.');
          }
        })
        .then(data => {
          setUser({ id: data.id, token: token });
        })
        .catch(error => {
          console.error(error);
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  // Log in user
  const login = async (username, password) => {
    const response = await fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token); // Store token in local storage

      // Fetch user data and set the user state
      const userResponse = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (userResponse.ok) {
        const data = await userResponse.json();
        setUser({ id: data.id, token: token });
        return true;
      } else {
        localStorage.removeItem('token');
        return false;
      }
    } else {
      return false;
    }
  };


  // Log out user
  const logout = async () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('user'); // Remove user from local storage
    setUser(null);
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };

*/