import {api} from './axiosCreate.tsx';

export const updateProject = async (projectId: string, project: any) => {
  try {
    const response = await api.patch(`/project-info/${projectId}`, project);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};