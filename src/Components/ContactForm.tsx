import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export const ContactForm = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleModalClose();
    };

    return (
        <>
            <Button variant="outline-light" onClick={handleModalShow}>
                Contact me
            </Button>

            <Modal
                show={showModal}
                onHide={handleModalClose}
                style={{
                    backgroundColor: "#your-modal-background-color",
                }}
            >
                <Modal.Header closeButton style={{ backgroundColor: "#444" }}>
                    <Modal.Title style={{ color: "#your-title-color" }}>Contact Me</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#444", color: "#100" }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label style={{ color: "white" }}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your Name"
                                required
                                style={{ backgroundColor: "#444", color: "white" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label style={{ color: "white" }}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Your Email"
                                required
                                style={{ backgroundColor: "#444", color: "#your-input-text-color" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label style={{ color: "white" }}>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Your Message"
                                required
                                style={{ backgroundColor: "#444" }}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#444" }}>

                    <Button variant="outline-light" type="submit">
                        Submit
                    </Button> 
                    <Button variant="outline-light" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

