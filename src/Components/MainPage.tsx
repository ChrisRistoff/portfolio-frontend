import {useEffect, useRef, useState} from "react";
import {Row, Col, Image, Spinner} from "react-bootstrap";
import "../CSS/MainPage.css";
import { ContactForm } from "./ContactForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { getPersonalInfo } from "../utils/getPersonalInfo.tsx";
import CV from "../assets/CV.pdf";
import statsData from "../../githubStats.json";
import {faCodeBranch, faFolder, faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
    const [animate, setAnimate] = useState(false);
    const [profileData, setProfileData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>({});

    const totalLinesAddedRef = useRef(null);
    const totalLinesDeletedRef = useRef(null);
    const totalCommitsRef = useRef(null);
    const numberOfRepositoriesRef = useRef(null);
    
    const handleDownload = () => {

        const link = document.createElement('a');
        link.href = CV;
        link.download = 'Chris_Ristoff_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const getProfileData = async () => {
            try {
                let data = await getPersonalInfo();
                setProfileData(data);
                
                setStats(statsData);

                setLoading(false);
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

    function animateCountUp(el, target, pre, post) {
        let count = 0;
        
        // Time it takes to count up
        const incrementTime = 20;
        
        // Calculate step based on target and incrementTime
        const step = target / 200;

        const counter = setInterval(() => {
            
            // Increase count by step and update text content
            count += step;
            
            // set text content to the current count
            el.textContent = `${pre} ${Math.floor(count).toLocaleString()} ${post}`;
            
            // Check if target is reached
            if (count >= target) {
                
                // Clear interval if target is reached
                clearInterval(counter);
                
                // Set text content to exact target
                el.textContent = `${pre} ${target.toLocaleString()} ${post}`;
            }
        }, incrementTime);
    }

    useEffect(() => {
       
        if (stats && !loading) {
            const handleAnimationEnd = (ref) => {
                ref.current.classList.add('highlight-stat');
            }

            animateCountUp(totalLinesAddedRef.current, stats.totalLinesAdded, "Added", "lines of code");
            animateCountUp(totalLinesDeletedRef.current, stats.totalLinesDeleted, "Deleted", "lines of code");
            animateCountUp(totalCommitsRef.current, stats.totalCommits, "Committed", "times");
            animateCountUp(numberOfRepositoriesRef.current, stats.numberOfRepositories, "In", "repositories");

            handleAnimationEnd(totalLinesAddedRef);
            handleAnimationEnd(totalLinesDeletedRef);
            handleAnimationEnd(totalCommitsRef);
            handleAnimationEnd(numberOfRepositoriesRef);        
        }
        
        
    }, [stats, loading]);

    return (
        loading ? (
            <div className="loading-text">
                <h3>Loading</h3>
                <h1><Spinner animation="border" /></h1>
            </div>
        ) : (
            <div className="container">
                <Row>
                    <Col md={6} className="profile-text">
                        <h1 className={`animated-element ${animate ? "animate-in" : ""}`}>{profileData.name}</h1>
                        <h3 className={`animated-element ${animate ? "animate-in" : ""}`}>{profileData.title}</h3>
                        <p className={`animated-element ${animate ? "animate-in" : ""}`}>{profileData.bio}</p>
                        <div className={`animated-element ${animate ? "animate-in" : ""}`}>
                        <a href="https://www.linkedin.com/in/chris-ristoff-1663362b0" target="_blank" rel="noopener noreferrer"
                          className="contact-link">
                          <FontAwesomeIcon icon={faLinkedin}/> Visit LinkedIn
                        </a>
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

                {/*Stats*/}
                <div className={`stats-container animated-element ${animate ? "animate-in" : ""}`}>
                    <h2>
                        <a href="https://github.com/chrisristoff" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub}/> GitHub
                        </a>
                    </h2>
                    <h4 className="highlight-stat">
                        <FontAwesomeIcon icon={faPlusCircle}/> <span
                        ref={totalLinesAddedRef}>Added 0 lines of code</span>
                    </h4>
                    <h4 className="highlight-stat">
                        <FontAwesomeIcon icon={faMinusCircle}/> <span
                        ref={totalLinesDeletedRef}>Deleted 0 lines of code</span>
                    </h4>
                    <h4 className="highlight-stat">
                        <FontAwesomeIcon icon={faCodeBranch}/> <span ref={totalCommitsRef}>Committed 0 times</span>
                    </h4>
                    <h4 className="highlight-stat">
                        <FontAwesomeIcon icon={faFolder}/> <span ref={numberOfRepositoriesRef}>In 0 repositories</span>
                    </h4>
                </div>


                {/*Button to download CV and contact form*/}
                <div className={`animated-element ${animate ? "animate-in" : ""}`}>
                    <div className="contact-form-section">
                        <ContactForm/>
                    </div>
                </div>

                <div style={{padding: "20px"}} className={`animated-element ${animate ? "animate-in" : ""}`}>
                    <div className={"btn btn-outline-light"} onClick={handleDownload}>Download My CV</div>
                </div>

            </div>
        )
    );
};
