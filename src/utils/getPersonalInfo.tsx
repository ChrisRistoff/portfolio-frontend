import { api } from './axiosCreate';

export const getPersonalInfo = async () => {
  try {
    const response = await api.get('/personal-info');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};