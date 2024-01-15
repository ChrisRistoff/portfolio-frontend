import {testAuth} from "../utils/login.tsx";
import {useState} from "react";

export const TestAuthPage = () => {

    const [message, setMessage] = useState('');

    const handleTestAuth = async () => {
        try {
            const response = await testAuth();
            setMessage(response);    
        }
        catch (error) {
            setMessage("Not Authorized");
        }
        
    }

    return (
        <>
            <p>{message}</p>
            <button onClick={handleTestAuth}>Test Auth</button>
        </>
    );
}