const request = require('supertest');
const app = require('./server');
const bcrypt = require('bcrypt');

const SERVER_PORT = 5001;

// Test the signup endpoint
describe('POST /api/signup', () => {
  it('should create a new user and return a 201 status code', async () => {
    const password = await bcrypt.hash('testpassword', 10);
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'testuser',
        password: password
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User created');
    expect(res.body.user.username).toEqual('testuser');
  });

  it('should return a 409 status code if the username already exists', async () => {
  //  const password = await bcrypt.hash('testpassword', 10);
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toEqual('Username already taken');
  });
});

// Test the signin endpoint
describe('POST /api/signin', () => {
  it('should authenticate the user and return a JWT token with a 200 status code', async () => {
    const res = await request(app)
      .post('/api/signin')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User signed in');
    expect(res.body.user.username).toEqual('testuser');
    expect(res.body.token).toBeDefined();
  });

  it('should return a 401 status code if the username does not exist', async () => {
 //   const password = await bcrypt.hash('testpassword', 10);
    const res = await request(app)
      .post('/api/signin')
      .send({
        username: 'nonexistentuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Invalid credentials');
  });

  it('should return a 401 status code if the password is incorrect', async () => {
 //   const password = await bcrypt.hash('testpassword', 10);
    const res = await request(app)
      .post('/api/signin')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Invalid password');
  });
});


// Test the deleteuser endpoint
describe('DELETE /api/deleteuser', () => {
  it('should delete the specified user and return a 200 status code', async () => {
    const res = await request(app)
      .delete('/api/deleteuser')
      .send({
        username: 'testuser'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User deleted');
  });
});
