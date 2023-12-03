import { useState } from 'react';
import axios from 'axios';

export function usePut() {
  const [updatedData, setUpdatedData] = useState(null);
  const [charging, setCharging] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (url, newData) => {
    setCharging(true);
    try {
      const response = await axios.put(url, newData);
      setUpdatedData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      setUpdatedData(null);
    } finally {
        setCharging(false);
    }
  };

  return { updatedData, charging, error, updateData };
}