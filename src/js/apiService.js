import axios from 'axios';
import apiPaths from './apiPaths';

const VITE_API_BASE_PATH = import.meta.env.VITE_API_PATH;

export const fetchData = async () => {
     try {
     const response = await axios.get(`${VITE_API_BASE_PATH}${apiPaths.n_k}`);
     // const response = await axios.get('https://77.246.96.85/grenso-api/n_k_calculate/');
     
     return response.data;
     } catch (error) {
     console.error('Error fetching data:', error);
     throw new Error('Сервис временно недоступен, попробуйте позже');
     }
};