import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import {
    Box,
    IconButton,
    Popover,
    Grid
} from '@mui/material';
import {
    AccountCircle,
    Cloud,
    Mail,
    YouTube,
    SmartToy,
    Map,
} from '@mui/icons-material';

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAppClick = (appName) => {
        console.log(`${appName} clicked`);
        handleClose();
    };

    const apps = [
        { name: 'Account', icon: <AccountCircle />, color: '#5f6368' },
        { name: 'Drive', icon: <Cloud />, color: '#4285f4' },
        { name: 'Gmail', icon: <Mail />, color: '#ea4335' },
        { name: 'YouTube', icon: <YouTube />, color: '#f44336' },
        { name: 'Gemini', icon: <SmartToy />, color: '#9c27b0' },
        { name: 'Maps', icon: <Map />, color: '#34a853' },
    ];

    return (
        <Box>
            <AppBar position="static" sx={{
                backgroundColor: "#fff",
                boxShadow: 'none',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Toolbar sx={{ minHeight: '64px', }}>
                    <Typography variant="h6" sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        color: "#4285f4",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "1.8vw"
                    }}>

                        DriveOSx <span style={{ color: "black", fontWeight: "light", marginLeft: '8px', fontSize: "1.6vw" }}>Account</span>
                    </Typography>

                    <IconButton
                        onClick={handleClick}
                        sx={{
                            color: '#4285f4',
                            padding: '10px',
                            '&:hover': {
                                backgroundColor: '4285f4'
                            }
                        }}
                    >
                        <AppsRoundedIcon sx={{ fontSize: '30px' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        width: '320px',
                        maxWidth: 'calc(100vw - 32px)',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px 2px rgba(0,0,0,0.2)',
                        marginTop: '8px',
                        padding: '16px',
                        backgroundColor: '#fff',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'transparent'
                    }
                }}
                disableScrollLock
            >
                <Grid container spacing={4}>
                    {apps.map((app, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '10px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        backgroundColor: '#f1f3f4',
                                    }
                                }}
                                onClick={() => handleAppClick(app.name)}
                            >
                                <Box
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: app.color,
                                        color: 'white',
                                        marginBottom: '8px'
                                    }}
                                >
                                    {React.cloneElement(app.icon, { sx: { fontSize: '30px' } })}
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#202124',
                                        fontWeight: 400,
                                        textAlign: 'center',
                                        fontSize: '13px',
                                        lineHeight: '16px'
                                    }}
                                >
                                    {app.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Popover>
        </Box>
    );
}