import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Use forwardRef for the Alert component
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const ProtectedRoute = ({ children, requiredAccessLevel }) => {
  const [userAccessLevel, setUserAccessLevel] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = () => {
      const role = sessionStorage.getItem("role");
      setUserAccessLevel(role);

      if (role !== requiredAccessLevel) {
        setOpenSnackbar(true); // Open Snackbar when access is denied
        setTimeout(() => {
          navigate('/home'); // Navigate after showing Snackbar
        }, 2000); // Delay navigation to allow the user to see the message
      }
    };

    setTimeout(checkAccess, 100); // Slight delay to ensure sessionStorage is populated
  }, [requiredAccessLevel, navigate]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Render the children if access level is sufficient
  if (userAccessLevel === requiredAccessLevel) {
    return children;
  }

  // If access is denied, show Snackbar and navigate back after delay
  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          Access Denied! You do not have the required permissions.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProtectedRoute;
