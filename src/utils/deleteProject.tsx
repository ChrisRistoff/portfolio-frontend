import {api} from './axiosCreate';

export const deleteProject = async (projectId: string) => {
  try {
    const response = await api.delete(`/project-info/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};