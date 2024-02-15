import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {sendEmail} from "../utils/sendEmail.tsx";
import "../CSS/ContactForm.css";

export const ContactForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    

    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
 
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log("Before sending email");

        try {
            await sendEmail({ name, email, subject, message });

            setName("");
            setEmail("");
            setSubject("");
            setMessage("");

            handleModalClose();
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <div>
            <Button variant="outline-light" onClick={handleModalShow}>
                Contact me
            </Button>

            <Modal
                show={showModal}
                onHide={handleModalClose}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Contact Me</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label >Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name..."
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label >Email</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email..."
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSubject">
                            <Form.Label >Subject</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter the subject..."
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message..."
                                required
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#444" }}>

                    <Button variant="outline-light" onClick={handleSubmit}>
                        Submit
                    </Button> 
                    <Button variant="outline-light" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

