import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    
    try {
      console.error('API error:', error.response || error.message);
    
    } catch (err) {
      console.error('Error during error handling:', err);
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
