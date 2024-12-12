import axios from 'axios';

// Function to fetch user consumption data
export const fetchUserConsumption = async (userId, year) => {
  try {
    const response = await axios.get(`/api/consumption/${userId}:${year}`);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching consumption data:', error);
    throw error;
  }
};
