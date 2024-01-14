import { Nav, Navbar } from "react-bootstrap";

export const Header = () => {
    return (
        <Navbar bg="#333" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/" className="mx-2">Home</Nav.Link>
                    <Nav.Link href="/projects" className="mx-2">Projects</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
