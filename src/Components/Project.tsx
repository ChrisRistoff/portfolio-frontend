import "../CSS/ProjectCard.css"

const Project = ({ project }) => {
    return (
        <div className="project">
            <div className="project-image-container">
                <img src={project.Image} alt={project.Name} className="project-image" />
            </div>
            <div className="project-details">
                <h3 className="project-name">{project.Name}</h3>
                <p className="project-tagline">{project.Tagline}</p>
                <p className="project-description">{project.Description}</p>
            </div>
            <div className="tech-stack">
                <h4>Tech Stack:</h4>
                <ul>
                    {project.TechStack.map((tech, index) => {
                            <li key={index}>{tech}</li>
                    })}
                </ul>
            </div>
            <div className="project-links">
                <a href={project.Repo} className="project-link">
                    Repository
                </a>
                <a href={project.Link} className="project-link">
                    Live Demo
                </a>
            </div>
        </div>
    );
};

export default Project;

