import { Box, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Roboto, sans-serif',
            }}
        >
            <Box textAlign="center" mb={2}>
                {/* <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="Google Logo"
                    style={{ width: 80 }}
                /> */}
                <Typography fontSize={30} fontWeight="bold" color="#4285f4" mb={1}> 
                    Drive OSx
                </Typography>

            </Box>
            <Outlet />

        </Box>

    )
}

export default Layout