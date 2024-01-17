import { useState, useEffect } from 'react';
import {getProjectInfo} from "../utils/getProjects.tsx";
import "../CSS/EditProjectsPage.css";
import {deleteProject} from "../utils/deleteProject.tsx";
import {ConfirmationModal} from "./ConfirmationModal.tsx";
import "../CSS/ConfirmationModal.css"
import {useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";

export const EditProjects = () => {
    const [projects, setProjects] = useState([]);
    const [update, setUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [authError, setAuthError] = useState(false);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);
 
        return () => clearTimeout(animationTimeout);
    }, []);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await getProjectInfo();
                setProjects(response);
            } catch (error) {
                console.error(error);
            }
        }
 
        getProjects();
    }, [update]);

    const handleEdit = async (projectId: number) => {
        navigate(`/edit-project/${projectId}`);
    };

    const handleConfirmDelete = async (projectId) => {
        setIsModalOpen(false);
        
        try {
            await deleteProject(projectId);
            setUpdate(!update);
        } catch (error) {
            setAuthError(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteClick = async (project) => {
        setProjectToDelete(project);
        setIsModalOpen(true);
    };

    return (
        <div className={`edit-projects-container animated-element ${animate ? "animate-in" : ""}`}>
            <h2>Edit Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="edit-project-item">
                        <span className="edit-project-name">{project.name}</span>
                        <div className="edit-project-actions">
                            <button onClick={() => handleEdit(project.id)} className="edit-project-button">Edit</button>
                            <button onClick={() => handleDeleteClick(project)} className="edit-project-button edit-project-button-delete">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                project={projectToDelete}
            />
            {authError && <Alert variant="danger">You are not authorized to delete a project!</Alert>}
        </div>
    );
};

export default EditProjects;
