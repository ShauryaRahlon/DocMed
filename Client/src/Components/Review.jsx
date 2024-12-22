import React from 'react'
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import '../Styling/Review.css'
function Review() {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(true); // Default dark mode enabled

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setCaption('');
        setError('');
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:3001/caption', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTimeout(() => {
                setCaption(response.data.caption);
            }, 500); // Simulate delay for animation
        } catch (err) {
            setError('Error generating caption. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            <header className="header1">
                <h1>AI Buddy</h1>
            </header>
            <div
                {...getRootProps()}
                className="dropzone"
            >
                <input {...getInputProps()} />
                <p>{file ? file.name : 'Drag & drop an image, or click to select one'}</p>
            </div>
            <button onClick={handleUpload} disabled={loading || !file} className="upload-button">
                {loading ? 'Generating...' : 'Analyze'}
            </button>
            {caption && (
                <div className="caption">
                    <h3>Result:</h3>
                    <ReactMarkdown>{caption}</ReactMarkdown>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Review;
