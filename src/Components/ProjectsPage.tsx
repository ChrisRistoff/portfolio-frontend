import { useEffect, useState } from "react";
import Project from "./Project";
import { getProjectInfo } from "../utils/getProjects";
import {Spinner} from "react-bootstrap";
import "../CSS/ProjectsPage.css";

export const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [filter, setFilter] = useState('Web App');

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

    const filteredProjects = projects.filter(project => {
        if (filter === 'All') return true;
        return project.type === filter;
    });

    return (
        <div className={"container"}>
            <h1 className={`page-title animated-element ${animate ? "animate-in" : ""}`}>Projects</h1>
            <div className={`filter-buttons animated-element ${animate ? "animate-in" : ""}`}>
                <button className={filter === 'Web App' ? 'active' : ''} onClick={() => setFilter('Web App')}>Web Apps
                </button>
                <button className={filter === 'DSA' ? 'active' : ''} onClick={() => setFilter('DSA')}>DSA</button>
                <button className={filter === 'CLI' ? 'active' : ''} onClick={() => setFilter('CLI')}>CLI Apps</button>
            </div>
            {loading ? (
                <div className="loading-text">
                    <h3>Loading Projects...</h3>
                    <h1><Spinner animation="border"></Spinner></h1>
                </div>
            ) : (
                <div className="projects-list">
                    <div className={`animated-element ${animate ? "animate-in" : ""}`}>
                        {filteredProjects.map((project) => (
                            <Project key={project.name} project={project}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
