/*
 import React, { useState, useEffect } from 'react';
 import { useAuth } from './AuthProvider';

 function GetAndStoreToken() {
   const [isGettingToken, setIsGettingToken] = useState(false);
   const [getTokenError, setGetTokenError] = useState(null);
   const { user, logout } = useAuth();

   const handleGetTokenClick = async () => {
     try {
       setIsGettingToken(true);
       const response = await fetch('http://localhost:5000/api/signin', {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${user.token}`
         }
       });

       //get token from backend

       if (response.ok) {
         const { token } = await response.json();
         localStorage.setItem('token', token); // Store token in local storage
       } else {
         const error = await response.json();
         throw new Error(error.message);
       }
     } catch (error) {
       console.error(error);
       setGetTokenError(error.message);
       setIsGettingToken(false);
     }
   };

   return (
     <div>
       {getTokenError && <p style={{ color: 'red' }}>{getTokenError}</p>}
       <button onClick={handleGetTokenClick} disabled={isGettingToken}>
         {isGettingToken ? 'Getting Token...' : 'Get Token'}
       </button>
     </div>
   );
 }

 export default GetAndStoreToken;

*/




