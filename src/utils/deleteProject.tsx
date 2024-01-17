import {api} from './axiosCreate';
import {getTokenFromCookie} from "./login.tsx";

export const deleteProject = async (projectId: string) => {
  try {
    const response = await api.delete(`/project-info/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${getTokenFromCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};