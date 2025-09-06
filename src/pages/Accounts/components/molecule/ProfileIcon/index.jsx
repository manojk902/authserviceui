import { Avatar, Box, Button, IconButton, Menu, MenuItem, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'
import { logout } from '../../../../../utils/logout';

const ProfileIcon = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += ('00' + value.toString(16)).slice(-2);
        }

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: name.split(" ")[0][0], // ✅ only first letter of first word
        };
    }
    return (
        <Box sx={{ flexGrow: 0, fontSize: '1vw', overflow: "hidden", ml: 2 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, bgcolor: "red" }}>
                <Avatar
                    sx={{ bgcolor: 'yellow', width: 40, height: 40 }}
                    {...stringAvatar('Mukesh Kumar')}
                />
            </IconButton>
            <Menu
                sx={{ mt: '45px', py:"0px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu} sx={{py:"0px",'&:hover':{backgroundColor:'white', color:'red'}}}>
                    <LogoutIcon/>
                    <Button onClick={() => logout()} color='dark' sx={{ textAlign: 'center' }}>
                        Log Out
                    </Button>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default ProfileIcon