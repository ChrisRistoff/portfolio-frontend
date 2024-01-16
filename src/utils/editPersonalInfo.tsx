import { api } from './axiosCreate';
import {getTokenFromCookie} from "./login.tsx";

export const editTitle = async (newTitle: string) => {
    try {
        const response = await api.patch('/personal-info/title', { title: newTitle } , {
            headers: {
                Authorization: `Bearer ${getTokenFromCookie()}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const editBio = async (newBio: string) => {
    try {
        const response = await api.patch('/personal-info/bio', { bio: newBio } , {
            headers: {
                Authorization: `Bearer ${getTokenFromCookie()}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};