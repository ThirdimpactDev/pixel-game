import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleOAuthCallback } from '../service/auth';

const OAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('Initializing authentication...');

    useEffect(() => {
        const processAuth = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const token = params.get('token');

                if (!token) {
                    throw new Error('No token received');
                }

                // Store the token
                localStorage.setItem('jwt_token', token);
                setStatus('Authentication successful! Redirecting...');
                
                // Redirect to game
                setTimeout(() => navigate('/game'), 1000);
            } catch (error) {
                console.error('Authentication error:', error);
                setStatus(`Authentication failed: ${error.message}`);
                setTimeout(() => navigate('/login'), 2000);
            }
        };

        processAuth();
    }, [location, navigate]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h2>{status}</h2>
            <p>Current URL: {window.location.href}</p>
            <p>If you're not redirected automatically, <button onClick={() => navigate('/login')}>click here</button></p>
        </div>
    );
};

// Add this line at the end of the file
export default OAuthRedirect;