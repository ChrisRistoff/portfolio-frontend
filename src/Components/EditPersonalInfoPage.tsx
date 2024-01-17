import { useState, useEffect } from 'react';
import { getPersonalInfo } from '../utils/getPersonalInfo';
import '../CSS/EditPersonalInfo.css';
import {editBio, editTitle} from "../utils/editPersonalInfo.tsx";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {editImage} from "../utils/editImage.tsx";

export const EditPersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState({ name: '', title: '', bio: '', image: '' });
    const [editing, setEditing] = useState({ title: false, bio: false });
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploadedImage, setUploadedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 500);

        return () => clearTimeout(animationTimeout);
    }, []);

    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const data = await getPersonalInfo();
                setPersonalInfo(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };

        fetchPersonalInfo();
    }, []);

    const handleEditClick = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleSave = async (field) => {
        
        if (field === 'title') {
            try {
                await editTitle(personalInfo[field]);
            }
            catch (error) {
                console.error('Error editing title:', error);
            }
        }
        
        if (field === 'bio') {
            try {
                await editBio(personalInfo[field]);
            }
            catch (error) {
                console.error('Error editing bio:', error);
            }
        }
        
        setPersonalInfo({ ...personalInfo, [field] : personalInfo[field] });
        setEditing({ ...editing, [field]: false });
    };
    
 
    const handleSaveImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', uploadedImage);
            
            await editImage(formData);
            navigate('/');
        }
        catch (error) {
            console.error('Error editing image:', error);
        }
    }

    return (
        
        <div>
            {loading ? (
                <div className="loading-text">
                    <h3>Loading...</h3>
                    <h1><Spinner animation="border"></Spinner></h1>
                </div>
            ) : (
                <div className={`animated-element ${animate ? "animate-in" : ""}`}>
                    <h2 className="edit-title">Edit Personal Information</h2>
                    <div className="info-section">
                        <label>Name:</label>
                        <div className="info-field">
                            <p>{personalInfo.name}</p>
                        </div>
                    </div>

                    <div className="info-section">
                        <label>Title:</label>
                        {editing.title ? (
                            <div>
                                <input
                                    className={"info-field-input"}
                                    type="text"
                                    value={personalInfo.title}
                                    onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                                />
                                <br/>
                                <button onClick={() => handleSave('title')} className="save-button">Save</button>
                            </div>
                        ) : (
                            <>
                                <p>{personalInfo.title}</p>
                                <button onClick={() => handleEditClick('title')} className="edit-button">Edit</button>
                            </>
                        )}
                    </div>

                    <div className="info-section">
                        <label>Bio:</label>
                        {editing.bio ? (
                            <>
                            <textarea
                                className={"info-field-textarea"}
                                value={personalInfo.bio}
                                onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
                            />
                                <br/>
                                <button onClick={() => handleSave('bio')} className="save-button">Save</button>
                            </>
                        ) : (
                            <>
                                <p>{personalInfo.bio}</p>
                                <button onClick={() => handleEditClick('bio')} className="edit-button">Edit</button>
                            </>
                        )}
                    </div>

                    <div className="info-section">
                        <label>Profile Picture:</label>
                        <div className="profile-photo-container">
                            <img src={personalInfo.image} alt="profile" className="profile-photo"/>
                        </div>
                        <input
                            type="file"
                            onChange={(e) => setUploadedImage(e.target.files[0])}
                            className="info-field-input file-input"
                        />
                        {uploadedImage && (
                            <button onClick={handleSaveImage} className="save-button">Save Photo</button>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};
