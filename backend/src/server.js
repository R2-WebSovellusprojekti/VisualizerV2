const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
const SERVER_PORT = 5000;

app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

//-----------------------------------------SERVER START------------------------------------------
// Start the server
app.listen(SERVER_PORT, () => {
  console.log('Server started on port', SERVER_PORT);
  });

//-----------------------------------------DATABASE----------------------------------------------
// Create a connection pool for the PostgreSQL database
const pool = new Pool({
 /*connectionString: 'postgres://r2:So89P9cm37yaR22nqNjyktWJLSB4Ywo7@dpg-cgi5v4seoogvqrjl6amg-a.frankfurt-postgres.render.com:5432/r2db',
  ssl: {
    rejectUnauthorized: false
  }*/

  user: 'postgres',
  host: 'localhost',
  database: 'r2db',
  password: 'password',
  password: 'password',
  port: 5432, // The default PostgreSQL port
});
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Error connecting to PostgreSQL database', err));

//-----------------------------------------SIGN UP-----------------------------------------------
// Define the /api/signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
 // console.log(req.body);

  // Check if the username already exists in the database
  pool.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
      return;
    }

    if (result.rows.length > 0) {
      // The username already exists, return a 409 Conflict status
      console.log(`Username ${username} already exists`);
      res.status(409).json({ message: 'Username already taken' });
      return;
    }

    // Insert the new user into the database
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
      }

      // Return a 201 Created status with the new user data
      console.log(`New user ${username} created`);
      res.status(201).json({ message: 'User created', user: { username } });

    });
  });
});

//-----------------------------------------SIGN IN-----------------------------------------------
// Define the /api/signin endpoint
app.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  pool.query('SELECT * FROM users WHERE username = $1', [username], async (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
      return;
    }

    if (result.rows.length === 0) {
      // The username does not exist, return a 401 Unauthorized status
      console.log(`Invalid credentials for user ${username}`);
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Check if the password matches the hashed password stored in the database
    const hashedPassword = result.rows[0].password;
    bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        return;
      }

      if (!passwordMatch) {
        // The password is incorrect, return a 401 Unauthorized status
        console.log(`Invalid password for user ${username}`);
        res.status(401).json({ message: 'Invalid password' });
        return;
      }

      // If the username and password are correct, create a JWT token
      const expiresInSec = 30 * 60; // 30 minutes
      const token = jwt.sign({ username }, secretKey, { expiresIn: expiresInSec });
      console.log('Token expiration time:', (expiresInSec / 60), 'minutes');


      // Return a 200 OK status with the token and user data
      console.log(`User ${username} signed in`);
      res.status(200).json({ message: 'User signed in', user: { username }, token });
//      console.log("Token: ", token);
/*
      //store token in json file and send it to frontend
      const fs = require('fs');
      const data = JSON.stringify(token);
      fs.writeFileSync('token.json', data);
*/
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            console.log('Token verification failed:', err);
          } else {
            const now = Math.floor(Date.now() / 1000); // current time in seconds
            const expiresInSec = decoded.exp - decoded.iat; // expiration time of token

            if (expiresInSec - (now - decoded.iat) < 300) { // if token expires in less than 5 minutes
            console.log('Your session will expire in 5 minutes. Please refresh your token.');
          }
        }
      });
    });
  });
});

//-----------------------------------------DELETE USER------------------------------------------------
// Define the /api/deleteuser endpoint
app.delete ('/api/deleteuser',  (req, res) => {
  const { username } = req.body;

      pool.query('DELETE FROM users WHERE users.username = $1', [username], (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
          return;
        }

        // Return a 200 OK status with the user data
        console.log(`User ${username} deleted`);
        res.status(200).json({ message: 'User deleted', user: { username } });
      });
    });

module.exports = app;

app.get('/api/hcmonthly', (req, res) => {
  pool.query('SELECT * FROM hc_monthly', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/api/hcannual', (req, res) => {
  pool.query('SELECT * FROM hc_annual', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/api/v2monthly', (req, res) => {
  pool.query('SELECT * FROM v2_monthly', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/api/v2annual', (req, res) => {
  pool.query('SELECT * FROM v2_annual', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/api/v3', (req, res) => {
  pool.query('SELECT * FROM v3', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/api/v5', (req, res) => {
  pool.query('SELECT * FROM v5', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});
