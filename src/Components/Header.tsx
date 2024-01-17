import {Nav, Navbar} from "react-bootstrap";
import "../CSS/Header.css";
import "../CSS/MainPage.css";
import {useEffect, useState} from "react";

export const Header = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);

        return () => clearTimeout(animationTimeout);
    }, []);

    return (
        <div className={`animated-element ${animate ? "animate-in" : ""}`}>
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/" className="nav-link-custom mx-2">Home</Nav.Link>
                    <Nav.Link href="/projects" className="nav-link-custom mx-2">Projects</Nav.Link>
                    <Nav.Link href="/login" className="nav-link-custom mx-2">Admin Login</Nav.Link>
                    <Nav.Link href="/admin" className="nav-link-custom mx-2">Admin Panel</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    );
};
