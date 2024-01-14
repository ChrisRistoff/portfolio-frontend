import { api } from './axiosCreate';

export const sendEmail = async ({name, email, subject, message}: {
    name: any,
    email: any,
    subject: any,
    message: any
}) => {
    try {
        const response = await api.post('/send-email', {
            name: name,
            emailOfSender: email,
            subject: subject,
            message: message
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
};