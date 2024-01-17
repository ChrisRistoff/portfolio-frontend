import "../CSS/ConfirmationModal.css";
import {useEffect, useState} from "react";

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, project }) => {
    if (!isOpen) return null;
    const [animate, setAnimate] = useState(false);
    
    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 200);
 
        return () => clearTimeout(animationTimeout);
    }, []);

    return (
        <div className={`modal-overlay animated-element ${animate ? "animate-in" : ""}`}>
            <div className="modal-content">
                <h4>Confirm Deletion</h4>
                <p>Are you sure you want to delete <b style={{color : "red"}}>{project?.name}?</b></p>
                <div>
                    <button onClick={onClose} className="modal-button">Cancel</button>
                    <button onClick={() => onConfirm(project?.id)} className="modal-button modal-button-delete">Delete</button>
                </div>
            </div>
        </div>
    );
};