import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "../CSS/MainPage.css"; // Import your custom CSS file
import { ContactForm } from "./ContactForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { getPersonalInfo } from "../utils/getPersonalInfo.tsx";

export const Home = () => {
    const [animate, setAnimate] = useState(false);
    const [profileData, setProfileData] = useState<any>({});

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
                <Col md={6} className="profile-text">
                    <h1 className={`animated-element ${animate ? "animate-in" : ""}`}>{profileData.name}</h1>
                    <h3 className={`animated-element ${animate ? "animate-in" : ""}`}>{profileData.title}</h3>
                    <p className={`animated-element ${animate ? "animate-in" : ""}`}>{profileData.bio}</p>
                    <div className={`animated-element ${animate ? "animate-in" : ""}`}>
                        <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                            <FontAwesomeIcon icon={faGithub}/> Visit GitHub
                        </a>
                        {profileData.linkedin && (
                            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                                <FontAwesomeIcon icon={faLinkedin}/> Visit LinkedIn
                            </a>
                        )}
                    </div>
                </Col>
                <Col md={6}>
                    <Image
                        src={profileData.image}
                        alt={profileData.name}
                        fluid
                        className={`animated-element ${animate ? "animate-in" : ""} profile-image`}
                    />
                </Col>
            </Row>
            <div className={`animated-element ${animate ? "animate-in" : ""}`}>
            <div className="contact-form-section">
                <ContactForm />
            </div>
            <div className="projects-button">
                <a href="/projects" className="btn btn-outline-light">View My Projects</a>
            </div>
        </div>
        </div>
    );
};
