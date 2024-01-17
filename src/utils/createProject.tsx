import {api} from './axiosCreate.tsx';
import {getTokenFromCookie} from "./login.tsx";

export const createProject = async (project) => {
    try {
        const response = await api.post('/project-info', project, {
            headers: {
                "Authorization": `Bearer ${getTokenFromCookie()}`
            }
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};