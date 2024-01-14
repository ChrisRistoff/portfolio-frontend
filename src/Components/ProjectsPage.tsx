import Project from "./Project"; // Import the Project component

export const ProjectsPage = () => {
    const projects = [
    {
        Id: 1,
        Name: "Portfolio",
        Tagline: "My personal website",
        Description: "My personal website, built with ASP.NET Core 8 and C#.",
        Image: "https://i.imgur.com/6Z2Q9ZM.png",
        Repo: "www.github.com/krasenHristov/portfolio",
        Link: "www.krasenhristov.com",
        TechStack: ["C#", "ASP.NET Core", "PostgreSQL", "Docker", "Nginx"],
        Type: "Backend",
    },
    ];

    return (
        <div className="projects-page">
        <h1 className="page-title">Projects</h1>
        <div className="projects-list">
    {projects.map((project) => (
            <Project key={project.Id} project={project} />
        ))}
    </div>
        </div>
        );
};
