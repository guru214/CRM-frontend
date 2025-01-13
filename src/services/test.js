// const UniversalCookie = require('universal-cookie');
// const cookies = new UniversalCookie();
// const { jwtDecode}= require('jwt-decode')

// const encryptedAccessToken = cookies.get('accessToken');
// console.log('Encrypted Access Token with universal-cookie:', encryptedAccessToken);

// if (encryptedAccessToken) {
//     const decryptedAccessToken = decrypt(encryptedAccessToken);
//     console.log('Decrypted Access Token:', decryptedAccessToken);

//     try {
//         const decodedToken = jwtDecode(decryptedAccessToken);
//         console.log('Decoded Token:', decodedToken);
//     } catch (error) {
//         console.error('Failed to decode token:', error);
//     }
// } else {
//     console.log('No access token found in cookies.');
// }
