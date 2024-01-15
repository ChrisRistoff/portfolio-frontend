import { api } from './axiosCreate';

function setTokenInCookie(token: string) {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000 * 3600; // 1 hour
    now.setTime(expireTime);

    document.cookie = `authToken=${token}; expires=${now.toUTCString()}; path=/; Secure; SameSite=Strict`;
}

export function getTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('authToken=')) {
            return cookie.substring('authToken='.length, cookie.length);
        }
    }
    return null;
}

export const loginAdmin = async (name: string, password: string) => {
    try {
        const response = await api.post('/login-admin', 
            {
                username: name,
                password: password,
        });
        
        setTokenInCookie(response.data.token);
        return {message: response.data};
    } catch (error) {
        return {message: error.response.data};
    }
};

export const testAuth = async () => {
    try {
        const response = await api.get('/test-auth', {
            headers: {
                Authorization: `Bearer ${getTokenFromCookie()}`,
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}