import { useState } from 'react';
import '../CSS/Login.css';
import {loginAdmin} from "../utils/login.tsx"; // Import the CSS for the login page

export const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        loginAdmin(name, password);
        event.preventDefault();
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
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
