import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation to login page

const instance = axios.create({
  baseURL: 'https://localhost:4000',
  // baseURL: 'https://crm-backend-onw8.onrender.com',
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a response interceptor to handle token expiration
instance.interceptors.response.use(
  (response) => response, // Pass through the response if it's successful
  async (error) => {
    if (error.response && error.response.status === 401) {
      // If access token is expired, try to refresh it
      try {
        const refreshResponse = await instance.post('/api/v1/refresh', {});
        console.log("refresh token is working",refreshResponse)
        // const newAccessToken = refreshResponse.data.accessToken;

        // Retry the original request with the new access token
        // error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(error.config); // Retry the failed request
      } catch (refreshError) {
        console.log('Refresh token failed, redirecting to login');
        // Call the navigateToLogin function with navigate passed as an argument
        navigateToLogin(); 
      }
    }
    return Promise.reject(error);
  }
);

// Function to handle redirection to the login page
function navigateToLogin() {
  // const navigate = useNavigate(); // Get the navigate function inside this function
  window.location.href('/login'); // Redirect to the login page
}

export default instance;
