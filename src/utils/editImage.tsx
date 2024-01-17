import {api} from './axiosCreate.tsx';
import {getTokenFromCookie} from "./login.tsx";

export const editImage = async (image: any) => {
  try {
    const response = await api.patch(`/personal-info/image`, image, {
        headers: {
            "Authorization": `Bearer ${getTokenFromCookie()}`
        }
        });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
