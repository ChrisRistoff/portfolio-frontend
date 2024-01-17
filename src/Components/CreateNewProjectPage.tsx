import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getProjectInfo} from "../utils/getProjects.tsx";
import {createProject} from "../utils/createProject.tsx";

export const CreateNewProjectPage = () => {
    const [project, setProject] = useState({
        id: 0,
        name: "",
        tagline: "",
        description: "",
        image: "",
        repo: "",
        link: "",
        techStack: [],
        type: "Frontend"
    });
    const [animate, setAnimate] = useState(false);
    
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
                
                let newId = 0;
                
                for (let i = 0; i < response.length; i++) {
                    if (response[i].id > newId) {
                        newId = response[i].id;
                    }
                }
                
                setProject({...project, id: newId + 1});
            } catch (error) {
                console.error(error);
            }
        }
 
        getProjects();
    }
    , []);
    
    const handleSubmit = async (e, project) => {
        e.preventDefault();
        
        const newProject = {
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
            console.log(newProject);
            await createProject(newProject);
            navigate('/projects');
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleAddTechStack = () => {
        setProject({...project, techStack: [...project.techStack, ""]});
    }
    
    const handleRemoveTechStack = (index) => {
        const newTechStack = [...project.techStack];
        newTechStack.splice(index, 1);
        setProject({...project, techStack: newTechStack});
    }
    
    const handleTechStackChange = (index, value) => {
        const newTechStack = [...project.techStack];
        newTechStack[index] = value;
        setProject({...project, techStack: newTechStack});
    }
    
    return (
        <div className={`edit-project-container animated-element ${animate ? "animate-in" : ""}`}>
            <h2>Edit Project</h2>
            <form onSubmit={(event) => handleSubmit(event, project)}>
                {/* ID */}
                <div className="form-group">
                    <label>ID</label>
                    <input
                        type="text"
                        value={project.id}
                        onChange={(e) => setProject({...project, id: +e.target.value})}
                    />
                </div>
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
                            <button type={"button"} onClick={() => handleRemoveTechStack(index)}
                                    className="delete-tech-button">Delete
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
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                    </select>
                </div>

                <button type="submit">Create Project</button>
            </form>
        </div>
    );
}