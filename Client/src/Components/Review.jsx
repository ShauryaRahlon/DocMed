import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactMarkdown from 'react-markdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styling/Review.css';

const Loader = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading">
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>
        </div>
    );
};

function Review() {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(true);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setCaption('');
        setError('');
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            toast.error('Please select a file first.', { autoClose: 2000 });
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
                toast.success('Review generated successfully.', { autoClose: 2000 });
            }, 500);
        } catch (err) {
            toast.error('Error generating review. Please try again.', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            <style>
                {`
                    .loading-wrapper {
                        display: flex;
                        justify-content: center;
                        margin: 20px 0;
                    }
                    .loading {
                        --speed-of-animation: 0.9s;
                        --gap: 6px;
                        --first-color: #4c86f9;
                        --second-color: #49a84c;
                        --third-color: #f6bb02;
                        --fourth-color: #f6bb02;
                        --fifth-color: #2196f3;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100px;
                        gap: 6px;
                        height: 100px;
                    }
                    .loading span {
                        width: 4px;
                        height: 50px;
                        background: var(--first-color);
                        animation: scale var(--speed-of-animation) ease-in-out infinite;
                    }
                    .loading span:nth-child(2) {
                        background: var(--second-color);
                        animation-delay: -0.8s;
                    }
                    .loading span:nth-child(3) {
                        background: var(--third-color);
                        animation-delay: -0.7s;
                    }
                    .loading span:nth-child(4) {
                        background: var(--fourth-color);
                        animation-delay: -0.6s;
                    }
                    .loading span:nth-child(5) {
                        background: var(--fifth-color);
                        animation-delay: -0.5s;
                    }
                    @keyframes scale {
                        0%, 40%, 100% {
                            transform: scaleY(0.05);
                        }
                        20% {
                            transform: scaleY(1);
                        }
                    }
                `}
            </style>
            <header className="header1">
                <h1>AI Buddy</h1>
            </header>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>{file ? file.name : 'Drag & drop an image, or click to select one'}</p>
            </div>
            <button onClick={handleUpload} disabled={loading || !file} className="upload-button">
                {loading ? 'Generating...' : 'Analyze'}
            </button>
            {loading && <Loader />}
            {caption && (
                <div className="caption">
                    <h3>Result:</h3>
                    <ReactMarkdown>{caption}</ReactMarkdown>
                </div>
            )}
            {error && <p className="error">{error}</p>}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Review;