import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    Typography,
    IconButton,
    TextField,
    ListItemIcon,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessIcon from '@mui/icons-material/Business'; // Building icon
import StorefrontIcon from '@mui/icons-material/Storefront'; // Floor icon
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Location icon

const SolarMenuList = ({ handleMenuItemClick }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [editingLabelId, setEditingLabelId] = useState(null);
    const [newLabel, setNewLabel] = useState('');
    const [openParent, setOpenParent] = useState(false);
    const [isSelected, setIsSelected] = useState(null);

    const handleParentToggle = () => {
        setOpenParent(!openParent);
    };

    const handleClick = (val, id) => {
        setIsSelected(val);
        handleMenuItemClick(val, id)
    }

    const renderIcon = (val) => {
        switch (val) {
            case 'facility':
                return <BusinessIcon />;
            case 'floor':
                return <StorefrontIcon />;
            case 'location':
                return <LocationOnIcon />;
            default:
                return null;
        }
    };

    const items = [
        {
            id: 1,
            label: 'Solar',
            type: 'facility',
            children: [
                { id: 2, label: 'Solar Panel', value: 'Solar_Panel', type: 'location' },
                { id: 3, label: 'Solar Prediction', value: 'Solar_Prediction', type: 'location' },
            ],
        },
    ];

    return (
        <List>
            {items.map((item) => (
                <React.Fragment key={item.id}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleParentToggle} sx={{
                            display: 'flex', gap: '20px', marginLeft: '12px'
                        }}>
                            {openParent ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
                            <ListItemIcon>{renderIcon(item.type)}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={openParent} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children.map((child) => (
                                <ListItem
                                    key={child.id}
                                    disablePadding
                                    selected={selectedMenuItem === child.id}
                                    onClick={() => handleClick(child.value, child.id)}
                                >
                                    <ListItemButton sx={{
                                        backgroundColor: isSelected === child.value ? 'rgba(207, 174, 255, 0.2)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(188, 187, 187, 0.5)',
                                        },
                                        display: 'flex',
                                        gap: '20px', pl: 4, ml: 5
                                    }}>
                                        <ListItemIcon>{renderIcon(child.type)}</ListItemIcon>
                                        <ListItemText
                                            primary={
                                                editingLabelId === child.id ? (
                                                    <TextField
                                                        value={newLabel}
                                                        autoFocus
                                                        variant="standard"
                                                    />
                                                ) : (
                                                    <Typography>{child.label}</Typography>
                                                )
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    );
};

export default SolarMenuList;
