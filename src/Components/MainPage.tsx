import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "../CSS/MainPage.css";
import { ContactForm } from "./ContactForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {getPersonalInfo} from "../utils/getPersonalInfo.tsx";

export const Home = () => {
    
    const [animate, setAnimate] = useState(false);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const getProfileData = async () => {
            try {
                let data: ProfileData;
                data = await getPersonalInfo();
                setProfileData(data);
            } catch (error) {
                console.error(error);
            }
        }
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
                    <h2 className={animate ? "animated-element animate-in" : "animated-element"}>
                        Hello, I am
                    </h2>
                    <h1 className={animate ? "animated-element animate-in" : "animated-element"}>
                        {profileData.name}
                    </h1>
                    <p className={animate ? "animated-element animate-in" : "animated-element"}>
                        {profileData.bio}
                    </p>
                    <p className={animate ? "animated-element animate-in" : "animated-element"}>
                        <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub}/> Visit GitHub
                        </a>
                    </p>
                    {profileData.linkedin && (
                        <p className={animate ? "animated-element animate-in" : "animated-element"}>
                            Linkedin: <a href={profileData.linkedin}>{profileData.linkedin}</a>
                        </p>
                    )}
                </Col>

                {/* column on right */}
                <Col md={6}>
                    <Image
                        src={profileData.image}
                        alt={profileData.name}
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

    export class ProfileData {
    }