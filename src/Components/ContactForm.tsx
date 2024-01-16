import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {sendEmail} from "../utils/sendEmail.tsx";

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
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                required
                                style={{ backgroundColor: "#444", color: "white" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label style={{ color: "white" }}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                                required
                                style={{ backgroundColor: "#444" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSubject">
                            <Form.Label style={{ color: "white" }}>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Subject"
                                required
                                style={{ backgroundColor: "#444" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label style={{ color: "white" }}>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your Message"
                                required
                                style={{ backgroundColor: "#444" }}
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
        </>
    );
};

