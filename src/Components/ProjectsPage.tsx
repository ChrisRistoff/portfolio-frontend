import { useEffect, useState } from "react";
import Project from "./Project";
import { getProjectInfo } from "../utils/getProjects";
import {Spinner} from "react-bootstrap";

export const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);

        return () => clearTimeout(animationTimeout);
    }, []);
    
    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await getProjectInfo();
                
                setProjects(data || []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        getProjects();
    }, []);

    return (
        <div className="projects-page">
            <h1 className={`page-title animated-element ${animate ? "animate-in" : ""}`}>Projects</h1>
            {loading ? (
                <div className="loading-text">
                    <h3>Loading Projects...</h3>
                    <h1><Spinner animation="border"></Spinner></h1>
                </div>
                ) : (
                <div className="projects-list">
                    <div className={`animated-element ${animate ? "animate-in" : ""}`}>
                    {projects.map((project) => (
                        <Project key={project.name} project={project} />
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
};
