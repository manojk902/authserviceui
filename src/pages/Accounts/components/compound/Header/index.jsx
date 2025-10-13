import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import {
    Box,
    IconButton,
} from '@mui/material';

import { Link } from 'react-router-dom';
import AppDrawer from '../../molecule/AppDrawer';
import ProfileIcon from '../../molecule/ProfileIcon';

export default function Header({firstName}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAppClick = (appName) => {
        handleClose();
    };

    return (
        <Box sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
            <AppBar position="static" sx={{
                backgroundColor: "#fff",
                boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
                // borderBottom: '3px solid #e0e0e0'
            }}>
                <Toolbar >
                    <Typography sx={{ flexGrow: 1, }}
                    >
                        <Typography component={Link}
                            to="/account" sx={{
                                color: "#4285f4",
                                textDecoration: "none",
                                fontWeight: "bold",
                                fontSize: "1.8vw"
                            }}>
                            DriveOSx <span style={{ color: "black", fontWeight:"normal", fontSize:"1.6vw" }}>Account</span>
                        </Typography>
                    </Typography>

                    <IconButton
                        onClick={handleClick}
                        sx={{
                            color: '#4285f4',
                            padding: '.5vw',
                            '&:hover': {
                                backgroundColor: '#4285f4',
                                color: '#fff',
                            }
                        }}
                    >
                        <AppsRoundedIcon sx={{ fontSize: '2vw' }} />
                    </IconButton>
                    <ProfileIcon firstName={firstName}/>
                </Toolbar>
                <AppDrawer open={open} anchorEl={anchorEl} handleClose={handleClose} handleAppClick={handleAppClick}/>
            </AppBar>
        </Box>
    );
}