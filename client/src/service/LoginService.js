const BASE_URL = 'http://localhost:8080';

export const loginWithGoogle = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
};

export const handleOAuthCallback = async () => {
    try {
        const response = await fetch(`${BASE_URL}/token.grant`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Authentication failed');
        const tokenData = await response.json();
        localStorage.setItem('jwt_token', tokenData.token);
        return tokenData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};