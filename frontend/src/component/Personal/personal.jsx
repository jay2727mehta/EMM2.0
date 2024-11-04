import { Box, Typography } from '@mui/material';
import React from 'react'

const Personal = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
            p={3}
        >
            <img
                src="/soon_10246815.gif"
                alt="Coming Soon GIF"
                style={{ width: "300px", marginBottom: "20px" }}
            />
            <Typography variant="h4" gutterBottom>
                Feature Coming Soon!
            </Typography>
            <Typography variant="body1" gutterBottom>
                We're working hard to bring you this feature. Stay tuned!
            </Typography>
            {/* <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
            <ArrowBackIosIcon fontSize="small" />
            Go Back
          </Button> */}
        </Box>
    );
}

export default Personal
