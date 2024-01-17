import {api} from './axiosCreate.tsx';

export const getProjectById = async (projectId: string) => {
  try {
    const response = await api.get(`/project-info/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};