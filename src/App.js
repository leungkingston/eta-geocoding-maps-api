// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [eta, setEta] = useState(null);
  const [hourState, setHours] = useState(0);
  const [minuteState, setMinutes] = useState(0);

  const calculateEta = async () => {
    try {
      const response = await axios.post('/calculateEta', {
        origin,
        destination,
      });

      setEta(response.data.eta);
    } catch (error) {
      console.error('Error calculating ETA:', error.message);
    }
  };

  useEffect(() => {
    if (eta !== null) {
      const hours = Math.floor(eta / 60);
      const minutes = eta % 60;

      setHours(hours);
      setMinutes(minutes);
    }
  }, [eta]);

  return (
    <div className="App">
      <h1>Calculate ETA Using Google Maps API</h1>
      <div>
        <label>Origin Address:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Enter origin address"
        />
      </div>
      <div>
        <label>Destination Address:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination address"
        />
      </div>
      <button onClick={calculateEta}>Calculate ETA</button>
      {eta !== null && <p>ETA: {eta} minutes</p>}
      {minuteState !== 0 && hourState !== 0 && (
        <p>
          {hourState} hour(s) and {minuteState} minutes
        </p>
      )}
    </div>
  );
}

export default App;

