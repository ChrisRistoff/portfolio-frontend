import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "../CSS/MainPage.css";
import { ContactForm } from "./ContactForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Home = () => {
    // Sample data
    const profileData = {
        Id: 1,
        Name: "Krasen Hristov",
        Email: "krsnhrstv@gmail.com",
        Bio:
            "My journey in the world of technology is fueled by a strong passion for learning and mastering the intricate aspects of server-side development. I am deeply engaged in understanding the fundamentals of scalable and efficient system design, eager to explore various technologies and methodologies.",
        Github: "https://github.com/krasenHristov",
        Linkedin: null,
        Image: "https://avatars.githubusercontent.com/u/59872801?v=4",
    };
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);

        return () => clearTimeout(animationTimeout);
    }, []);

    return (
        <div className="container">
            <Row>
                {/* column on left */}
                <Col md={6}>
                    <h2 className={animate ? "animated-element animate-in" : "animated-element"}>
                        Hello, I am
                    </h2>
                    <h1 className={animate ? "animated-element animate-in" : "animated-element"}>
                        {profileData.Name}
                    </h1>
                    <p className={animate ? "animated-element animate-in" : "animated-element"}>
                        {profileData.Bio}
                    </p>
                    <p className={animate ? "animated-element animate-in" : "animated-element"}>
                        <a href={profileData.Github} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub}/> Visit GitHub
                        </a>
                    </p>
                    {profileData.Linkedin && (
                        <p className={animate ? "animated-element animate-in" : "animated-element"}>
                            Linkedin: <a href={profileData.Linkedin}>{profileData.Linkedin}</a>
                        </p>
                    )}
                </Col>

                {/* column on right */}
                <Col md={6}>
                    <Image
                        src={profileData.Image}
                        alt={profileData.Name}
                        fluid
                        className={animate ? "animated-element animate-in" : "animated-element"}
                    />
                </Col>
            </Row>

            <p className={animate ? "animated-element animate-in" : "animated-element"}>
            <ContactForm />
            </p>
        </div>
    );
};
