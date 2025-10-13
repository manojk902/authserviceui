import { Box, Typography } from '@mui/material'
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
                <Typography fontSize={30} fontWeight="bold" color="#4285f4" mb={1}> 
                    Drive OSx
                </Typography>

            </Box>
            <Outlet />

        </Box>

    )
}

export default Layout