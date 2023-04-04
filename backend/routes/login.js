const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const card = require('../models/card_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


router.post('/',
  function(request, response) {
    if(request.body.username && request.body.password){
      const username = request.body.username;
      const password = request.body.password;
        card.checkPassword(username, function(dbError, dbResult) {
          if(dbError){
            if (dbError.errno = -4078){   // JOS DATABASE NURIN
              console.log("Database offline");
              response.send("Database offline");
            }
            else
            response.json(dbError.errno);
          }
          else
          {
            if (dbResult.length > 0) {
              bcrypt.compare(password,dbResult[0].password, function(err,compareResult) {
                if(compareResult) {
                  console.log("Success");
                  const token = generateAccessToken({ username: username });
                  response.send(token);
                }
                else {
                    console.log("Wrong password");
                    response.send("Wrong password");
                }
              }
              );
            }
            else{
              console.log("User does not exists");
              response.send("No such user");
            }
          }
          }
        );
      }
    else{

      console.log("Username or password missing");
      response.send("Check username/password");
    }
  }
);

function generateAccessToken(username) {
    dotenv.config();
    return jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '1800s' });
  }


module.exports=router;