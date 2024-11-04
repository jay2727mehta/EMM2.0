import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import errorLogo from './error_11255994.gif';

const ErrorPage = ({ errorCode = 404, errorMessage = "Page Not Found", onGoBack }) => {

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
    };

    return (
        <Container maxWidth="md" sx={{ ...styles.thinBorder, textAlign: 'center', padding: '2rem', borderRadius: '20px', display: 'flex', justifyContent : "space-evenly", alignContent : 'space-evenly' }}>
            <Box display="flex" justifyContent="center" mb={2}>
                <img src={errorLogo} alt="Error" style={{ width: '100%', maxWidth: '400px' }} />
            </Box>
            <Box sx={{ alignItems : 'center', display : 'flex', flexDirection : 'column', gap : 0, margin : 'auto'}}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>Oops...</Typography>
                </Box>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                    {errorCode}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {errorMessage}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onGoBack}
                    sx={{ mt: 4, borderRadius: '15px' }}
                >
                    Go Back
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage;
