//calculateEta.js
import axios from 'axios';

const calculateEta = async (origin, destination) => {
  try {
    const response = await axios.post('/calculateEta', {
      origin,
      destination,
      apiKey: 'YOUR_API_KEY', // Replace with your actual API key
    });
    console.log('ETA Response:', response.data);
    // Handle the response as needed in your React app
  } catch (error) {
    console.error('Error calculating ETA:', error.message);
  }
};

export default calculateEta;
