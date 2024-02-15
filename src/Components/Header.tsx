import {Nav, Navbar} from "react-bootstrap";
import "../CSS/Header.css";
import "../CSS/MainPage.css";
import {useEffect, useState} from "react";
import "../CSS/NavBar.css"
import {logout} from "../utils/login.tsx";

export const Header = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);

        return () => clearTimeout(animationTimeout);
    }, []);
    
    const handleLogout = () => {
        logout();
    }

    return (
        <div className={`animated-element ${animate ? "animate-in" : ""}`}>
            <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="position-absolute ms-auto"
                         style={{left: '50%', transform: 'translateX(-50%)'}}>  {/* Changes here */}
                        <Nav.Link href="/" className="nav-link-custom mx-2">Home</Nav.Link>
                        <Nav.Link href="/projects" className="nav-link-custom mx-2">Projects</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {localStorage.getItem('admin') === 'true' ? (
                            <div>
                                <Nav.Link href="/admin" className="nav-link-custom mx-2">Admin Panel</Nav.Link>
                                <Nav.Link href="/" onClick={handleLogout} className="nav-link-custom mx-2">Logout</Nav.Link>
                            </div>
                        ) : 
                        <Nav.Link href="/login" className="nav-link-custom mx-2">Admin Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
