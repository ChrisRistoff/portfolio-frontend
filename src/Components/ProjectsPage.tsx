import { useEffect, useState } from "react";
import Project from "./Project";
import { getProjectInfo } from "../utils/getProjects";

export const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            try {
                let data;
                data = await getProjectInfo();
                
                setProjects(data || []);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        getProjects();
    }, []);

    return (
        <div className="projects-page">
            <h1 className="page-title">Projects</h1>
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="projects-list">
                    {projects.map((project) => (
                        <Project key={project.name} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};
