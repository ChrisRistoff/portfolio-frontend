import {api} from './axiosCreate.tsx';
import {getTokenFromCookie} from "./login.tsx";

export const updateProject = async (projectId: string, project: any) => {
  try {
    const response = await api.patch(`/project-info/${projectId}`, project, {
      headers: {
        'Authorization': `Bearer ${getTokenFromCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};