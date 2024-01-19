import "../CSS/ProjectCard.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faLink} from "@fortawesome/free-solid-svg-icons";

const Project = ({ project }) => {
    
    return (
        <div className="project">
            <div className="project-details">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-description">{project.description}</p>
            </div>
            <div className="tech-stack">
                <h4>Tech Stack:</h4>
                <ul>
                    {project.techStack.map((tech, index) => {
                        return <li key={index}>{tech}</li>
                    })}
                </ul>
            </div>
            <div className="project-links">
                <a href={`${project.repo}`} target="_blank" className="project-link">
                    <FontAwesomeIcon icon={faGithub} /> Repository
                </a>
                <a href={`${project.link}`} target="_blank" className="project-link">
                    <FontAwesomeIcon icon={faLink} /> Live Demo
                </a>
            </div>
        </div>
    );
};

export default Project;