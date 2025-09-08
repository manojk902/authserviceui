import { AccountCircle } from '@mui/icons-material';
import { Box, Grid, Popover, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const AppDrawer = ({ open, anchorEl, handleClose, handleAppClick }) => {
    const token = localStorage.getItem("token")
    const apps = [
        { name: 'Portfolio-stage', icon: <AccountCircle />, img: "https://cdn-icons-png.freepik.com/512/9537/9537722.png", color: '#5f6368', url: process.env.REACT_APP_PORTFOLIO_URL },
    ];
    return (
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
                    width: '25vw',
                    maxWidth: 'calc(100vw - 32px)',
                    borderRadius: '.8vw',
                    boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
                    marginTop: '8px',
                    padding: '.5vw',
                    backgroundColor: '#f1f3f4',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                },
                '& .MuiBackdrop-root': {
                    backgroundColor: 'transparent'
                }
            }}
            disableScrollLock
        >
            <Grid container spacing={4} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxHeight: '45vh',
                overflowY: 'auto',
                backgroundColor: "#fff",
                padding: ".2vw 0vw",
                borderRadius: '.8vw',
            }}>
                {apps.map((app, index) => (
                    <Grid item xs={4} key={index}>
                        <Box
                            component={Link}
                            to={`${app.url}?token=${token}`}
                            target='_blank'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '10px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textDecoration: "none",
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                    backgroundColor: '#f1f3f4',
                                    borderRadius: '.8vw',
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
                                    // backgroundColor: app.color,
                                    color: 'white',
                                    marginBottom: '8px'
                                }}
                            >
                                {/* {React.cloneElement(app.icon, { sx: { fontSize: '30px' } })} */}
                                <Box
                                    component="img"
                                    src={app.img}
                                    alt="Logo-img"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: "cover",
                                    }}
                                />
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
    )
}

export default AppDrawer
