import { useState, useEffect } from 'react';
import {getProjectById} from "../utils/getProjectById.tsx";
import {useNavigate, useParams} from "react-router-dom";
import "../CSS/EditSingleProject.css";
import {updateProject} from "../utils/updateProject.tsx";
import {Alert} from "react-bootstrap";

const EditSingleProjectPage = () => {
    const [project, setProject] = useState({
        id: '',
        name: '',
        tagline: '',
        description: '',
        image: '',
        repo: '',
        link: '',
        techStack: [],
        type: ''
    });
    const [animate, setAnimate] = useState(false);
    const [authError, setAuthError] = useState(false);
    
    const navigate = useNavigate();
    const params = useParams();
    
    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);
 
        return () => clearTimeout(animationTimeout);
    }, []);

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await getProjectById(params.projectId);
                setProject(response);
            } catch (error) {
                console.error(error);
            }
        }

        getProject();
    }, []);

    const handleSubmit = async (e, project) => {
        e.preventDefault();
        
        const updatedProject = {
            id: project.id,
            name: project.name,
            tagline: project.tagline,
            description: project.description,
            image: project.image,
            repo: project.repo,
            link: project.link,
            techStack: project.techStack,
            type: project.type
        };
        
        try {
            const res = await updateProject(project.id, updatedProject);
            
            if (res.status === 401) {
                setAuthError(true);
            }
            else {
                navigate('/projects');
            }
        } catch (error) {
            setAuthError(true);
        }
    }
    
    const handleTechStackChange = (index, value) => {
        const updatedTechStack = [...project.techStack];
        updatedTechStack[index] = value;
        setProject({ ...project, techStack: updatedTechStack });
    };

    const handleAddTechStack = () => {
        setProject({ ...project, techStack: [...project.techStack, ''] });
    };

    const handleRemoveTechStack = (index) => {
        const updatedTechStack = [...project.techStack];
        updatedTechStack.splice(index, 1);
        setProject({ ...project, techStack: updatedTechStack });
    };

    useEffect(() => {
        let timeout;
        if (authError) {
            timeout = setTimeout(() => {
                setAuthError(false);
            }, 2000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [authError]);

    return (
        <div className={`edit-project-container animated-element ${animate ? "animate-in" : ""}`}>
            {authError && (
                <div className="error-modal">
                    <Alert variant="danger">Error: You are not authorized to do this!</Alert>
                </div>
            )}
            <h2>Edit Project</h2>
            <form onSubmit={(event) => handleSubmit(event, project)}>
            {/* Name */}
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={project.name}
                        onChange={(e) => setProject({...project, name: e.target.value})}
                    />
                </div>

                {/* Tagline */}
                <div className="form-group">
                    <label>Tagline</label>
                    <input
                        type="text"
                        value={project.tagline}
                        onChange={(e) => setProject({...project, tagline: e.target.value})}
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={project.description}
                        onChange={(e) => setProject({...project, description: e.target.value})}
                    ></textarea>
                </div>

                {/* Image URL */}
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        value={project.image}
                        onChange={(e) => setProject({...project, image: e.target.value})}
                    />
                </div>

                {/* Repository URL */}
                <div className="form-group">
                    <label>Repository URL</label>
                    <input
                        type="text"
                        value={project.repo}
                        onChange={(e) => setProject({...project, repo: e.target.value})}
                    />
                </div>

                {/* Project Link */}
                <div className="form-group">
                    <label>Project Link</label>
                    <input
                        type="text"
                        value={project.link}
                        onChange={(e) => setProject({...project, link: e.target.value})}
                    />
                </div>

                {/* Tech Stack */}
                <div className="form-group">
                    <label>Tech Stack</label>
                    {project.techStack.map((tech, index) => (
                        <div key={index} className="tech-stack-item">
                            <input
                                type="text"
                                value={tech}
                                onChange={(e) => handleTechStackChange(index, e.target.value)}
                            />
                            <button type={"button"} onClick={() => handleRemoveTechStack(index)} className="delete-tech-button">Delete
                            </button>
                        </div>
                    ))}
                    <button type={"button"} onClick={handleAddTechStack} className="add-tech-button">Add Tech</button>
                </div>

                {/* Type */}
                <div className="form-group">
                    <label>Type</label>
                    <select
                        className="form-control"
                        value={project.type}
                        onChange={(e) => setProject({...project, type: e.target.value})}
                    >
                        <option value="Web App">Web App</option>
                        <option value="DSA">DSA</option>
                        <option value="CLI">CLI</option>
                    </select>
                </div>

                <button type="submit">Update Project</button>
            </form>
        </div>
    );
}

export default EditSingleProjectPage;