import "../CSS/ProjectCard.css"

const Project = ({ project }) => {
    return (
        <div className="project">
            <div className="project-image-container">
                <img src={project.image} alt={project.name} className="project-image" />
            </div>
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
                <a href={project.repo} className="project-link">
                    Repository
                </a>
                <a href={project.link} className="project-link">
                    Live Demo
                </a>
            </div>
        </div>
    );
};

export default Project;