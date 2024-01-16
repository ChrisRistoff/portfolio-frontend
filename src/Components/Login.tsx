import {useEffect, useState} from 'react';
import '../CSS/Login.css';
import '../CSS/MainPage.css';
import {loginAdmin} from "../utils/login.tsx";
import { useNavigate } from 'react-router-dom';
import {Alert} from "react-bootstrap";

export const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [animate, setAnimate] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);
 
       return () => clearTimeout(animationTimeout);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginAdmin(name, password);
            navigate('/admin');
        }
        catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div className={`login-container animated-element ${animate ? "animate-in" : ""}`}>
            <form onSubmit={handleSubmit} className="login-form">
                {message && <Alert variant="danger">{message}</Alert>}
                <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input
                        type="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
};

export default Login;
