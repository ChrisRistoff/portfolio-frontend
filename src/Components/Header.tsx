import { Nav, Navbar } from "react-bootstrap";
import "../CSS/Header.css";

export const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/" className="nav-link-custom mx-2">Home</Nav.Link>
                    <Nav.Link href="/projects" className="nav-link-custom mx-2">Projects</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
