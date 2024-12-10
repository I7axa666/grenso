import axios from 'axios';
import apiPaths from './apiPaths';

const URL = import.meta.env.VITE_API_PATH;

export const fetchData = async (param, data = {}) => {
     if (param === 'n_k') {
     try {
          const response = await axios.get(`${URL}${apiPaths.n_k}`);
          // const response = await axios.get('https://solo-develop.ru/grenso-api/n_k_calculate/');
          return response.data;
     } catch (error) {
          console.error('Error fetching data:', error);
          throw new Error('Сервис временно недоступен, попробуйте позже');
     }
     } else if (param === 'matrix') {
     try {
          const response = await axios.post(`${URL}${apiPaths.financ_matrix}`, JSON.stringify(data));
          return response.data;
     } catch (error) {
          console.error('Error fetching data:', error);
          throw new Error('Сервис временно недоступен, попробуйте позже');
     }
     } else {
     throw new Error('Invalid parameter provided');
     }
};