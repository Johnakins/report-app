import axios from 'axios';

const API_URL = 'http://localhost:3000';

const createIncident = (incidentData) => {
  return axios.post(`${API_URL}/incidents`, incidentData);
};

const getIncidents = (category) => {
  const url = category ? `${BASE_URL}/incidents?category=${category}` : `${BASE_URL}/incidents`;
  return axios.get(url);
};

export default {
  createIncident,
  getIncidents,
};
