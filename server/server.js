//server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Endpoint to calculate ETA
app.post('/calculateEta', async (req, res) => {
  try {
    // Extract origin and destination addresses from the request body
    const { origin, destination } = req.body;

    // Use Google Maps API to calculate ETA
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(apiUrl);

    // Extract ETA from the Google Maps API response
    const etaInSeconds = response.data.routes[0].legs[0].duration.value;
    const etaInMinutes = Math.ceil(etaInSeconds / 60);

    res.json({ eta: etaInMinutes });
  } catch (error) {
    console.error('Error calculating ETA:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
