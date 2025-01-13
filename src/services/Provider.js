import React, { useEffect, useState, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import crypto from 'crypto-browserify';
// import Cookies from 'js-cookie';
const secret_key = process.env.REACT_APP_SECRET_KEY;


// AES-GCM encryption configuration 
const algorithm = 'aes-256-gcm'; 
const secretKey = Buffer.from(secret_key, 'hex');  // Use secret key from .env 

const decrypt = (encryptedText) => { 
    const [ivHex, encryptedData, authTagHex] = encryptedText.split(':'); 
    if (!ivHex || !encryptedData || !authTagHex) { 
      // console.log(ivHex);
      // console.log(authTagHex)
      // console.log(encryptedData)
      throw new Error('Invalid encrypted text format'); 
    } 
      const iv = Buffer.from(ivHex, 'hex'); 
      const authTag = Buffer.from(authTagHex, 'hex'); 
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv); 
      decipher.setAuthTag(authTag); 
      let decrypted = decipher.update(encryptedData, 'hex', 'utf-8'); 
      decrypted += decipher.final('utf-8'); 
      return decrypted;
};

// Create a UserContext to store user info globally
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const encryptedToken = Cookies.get('accessToken');
    if (encryptedToken) {
      const decryptedToken = decrypt(encryptedToken);
      const decoded = JSON.parse(atob(decryptedToken.split('.')[1])); // Decode JWT
      const userId = decoded.userId;
      const Email = decoded.Email;
      const AccountID = decoded.AccountID;
      const Role = decoded.Role;
      const isEmailVerified = decoded.isEmailVerified
      console.log("user details:",userId,Email,AccountID,Role,isEmailVerified);
      setUserData({ userId, Email, AccountID, Role, isEmailVerified }); // Store user data

      // Optionally, make an API request to fetch user-specific data
    //   axios
    //     .get(`/api/user/${userId}`, {
    //       headers: {
    //         Authorization: `Bearer ${userId}`, // Send user info in Authorization header
    //       },
    //     })
    //     .then((response) => {
    //       console.log('User data:', response.data);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching user data:', error);
    //     });
    }
  }, []);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};
