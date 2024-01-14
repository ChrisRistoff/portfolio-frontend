import { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import "../CSS/MainPage.css"; // Import your custom CSS file
import { ContactForm } from "./ContactForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getPersonalInfo } from "../utils/getPersonalInfo.tsx";

export const Home = () => {
    const [animate, setAnimate] = useState(false);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const getProfileData = async () => {
            try {
                let data = await getPersonalInfo();
                setProfileData(data);
            } catch (error) {
                console.error(error);
            }
        };
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);

        getProfileData();
        return () => clearTimeout(animationTimeout);
    }, []);

    return (
        <div className="container">
            <Row>
                {/* column on left */}
                <Col md={6}>
                    <h1 className={`animated-element ${animate ? "animate-in" : ""} title`}>
                        {profileData.name}
                    </h1>
                    <h3 className={`animated-element ${animate ? "animate-in" : ""} subtitle`}>
                        {profileData.title}
                    </h3>
                    <p className={`animated-element ${animate ? "animate-in" : ""} bio`}>
                        {profileData.bio}
                    </p>
                    <p className={`animated-element ${animate ? "animate-in" : ""}`}>
                        <a href={profileData.github} target="_blank" rel="noopener noreferrer"
                           className="contact-link">
                            <FontAwesomeIcon icon={faGithub}/> Visit GitHub
                        </a>
                    </p>

                    {profileData.linkedin && (
                        <p className={`animated-element ${animate ? "animate-in" : ""}`}>
                            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer"
                               className="contact-link">
                                <FontAwesomeIcon icon={linkedIn}/> Visit LinkedIn
                            </a>
                        </p>
                    )}
                </Col>

                {/* column on right */}
                <Col md={6}>
                    <Image
                        src={profileData.image}
                        alt={profileData.name}
                        fluid
                        className={`animated-element ${animate ? "animate-in" : ""} profile-image`}
                    />
                </Col>
            </Row>

            <p className={animate ? "animated-element animate-in" : "animated-element"}>
                <ContactForm />
            </p>

            <p className={animate ? "animated-element animate-in" : "animated-element"}>
                <Button variant="outline-light" href="/projects">
                    View My Projects
                </Button>
            </p>
        </div>
    );
};

