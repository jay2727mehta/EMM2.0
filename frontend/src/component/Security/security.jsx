import { Box, Divider, Typography, Select, MenuItem, Button, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as UserIcon } from '../config/svgfiles/user-cicrle-svgrepo-com.svg';
import { assignUsers, fetchUsers } from '../Services/auth.service';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import Loading from '../Loading/loading';

const Security = () => {
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('role');
    const userName = sessionStorage.getItem('userName');
    const email = sessionStorage.getItem('email');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const getUsers = async () => {
        try {
            const resp = await fetchUsers();
            if (resp.response.status === 200) {
                setUsers(resp.response.data);
            } else {
                setError('Failed to load users');
            }
        } catch (error) {
            setError('An error occurred while fetching users');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const assignUser = async () => {
        try {
            const assignBody = {
                admin_id: userId,
                user_id: selectedUser
            };

            const resp = await assignUsers(assignBody);
            if (resp) {
                setSnackbarMessage('User assigned successfully!');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage('Failed to assign user.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('An error occurred while assigning the user.');
            setSnackbarSeverity('error');
            console.error(error);
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Box sx={{ display: 'flex', flexDirection : 'column',fontWeight : 'bold',justifyContent: 'center', gap : '10px',alignItems: 'center', color: "#757676", margin : 'auto',height : '70vh' }}>
            <WifiOffIcon className="temperature-icon" width={300} height={300} /> <Typography variant="h4" fontWeight="bold">
        Offline
      </Typography>
        </Box>;
    }

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            // boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
            backgroundColor: "white",
        },
    };

    return (
        <div>
            <Box sx={{ ...styles.thinBorder, display: 'flex', margin: 'auto', flexDirection: 'column', gap: '20px', padding: 4, width: '30%', borderRadius: '20px', height: '100%' }}>
                <Typography variant="h6"
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="28px"
                    marginLeft="20px">
                    アサイン ユーザー
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <UserIcon style={{ width: '50px', height: '50px', fill: 'blue' }} />
                    <Typography sx={{ fontWeight: 'bold', }}>
                        {userName}
                    </Typography>
                </Box>
                <Divider />
                <FormControl>
                    <InputLabel>選択 ユーザー</InputLabel>
                    <Select
                        label='select user'
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        sx={{ borderRadius: '20px' }}
                    >

                        {users.length ?
                            users.map((item) => (
                                <MenuItem key={item.user_id} value={item.user_id}>
                                    {item.first_name}
                                </MenuItem>
                            )) : <MenuItem>
                                いいえ ユーザー 発見者
                            </MenuItem>}
                    </Select>
                </FormControl>
                <Button variant='contained' onClick={assignUser} sx={{ borderRadius: '20px', gap: '10px' }}>
                    <AssignmentIndIcon /> Assign
                </Button>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={2000}
                    onClose={handleSnackbarClose}
                >
                    <Alert variant='filled' onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    );
};

export default Security;
