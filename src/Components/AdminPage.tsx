import '../CSS/AdminPage.css';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";

export const Admin = () => {
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);

        return () => clearTimeout(animationTimeout);
    }
    , []);
    
    const navigateToEditPersonalInfo = () => {
        navigate('/edit-personal-info');
    };

    const navigateToEditProjects = () => {
        navigate('/edit-projects');
    };
    
    const navigateToCreateProject = () => {
        navigate('/create-project');
    };

    return (
        <div className={`admin-container animated-element ${animate ? "animate-in" : ""}`}>
            <h2 className="admin-title">Admin Dashboard</h2>
            <button onClick={navigateToEditPersonalInfo} className="admin-button">Edit Personal Info</button>
            <button onClick={navigateToEditProjects} className="admin-button">Edit Projects</button>
            <button onClick={navigateToCreateProject} className="admin-button">Create a new project</button>
        </div>
    );
};

export default Admin;
