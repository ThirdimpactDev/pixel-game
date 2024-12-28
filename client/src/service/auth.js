// src/service/auth.js
const BASE_URL = 'http://localhost:8080';

export const loginWithGoogle = () => {
    try {
        console.log('Initiating Google login...');
        console.log('Redirecting to:', `${BASE_URL}/oauth2/authorization/google`);
        window.location.href = `${BASE_URL}/oauth2/authorization/google`;
    } catch (error) {
        console.error('Error initiating Google login:', error);
    }
};

export const handleOAuthCallback = async () => {
    try {
        console.log('Handling OAuth callback...');
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (!token) {
            throw new Error('No token received in URL parameters');
        }

        localStorage.setItem('jwt_token', token);
        return { token };
    } catch (error) {
        console.error('OAuth callback error:', error);
        throw error;
    }
};

// Asegúrate de que esta función esté exportada
export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt_token');
    return !!token;
};

export const logout = () => {
    localStorage.removeItem('jwt_token');
};