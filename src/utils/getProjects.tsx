import { api } from './axiosCreate';

export const getProjectInfo = async () => {
    try {
        const response = await api.get('/project-info');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};