import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import { Link } from 'react-router-dom';
import { Box} from '@mui/material';

export default function Header() {

    return (
        <Box>
        <AppBar sx={{ backgroundColor: "#fff", display:"block",position:"static" }}>
            <Toolbar>
                <Typography

                    sx={{
                        flexGrow: 1,

                    }}
                >
                    <Typography component={Link}
                        to="/" sx={{
                            color: "#4285f4",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "1.8vw"
                        }}>

                        DriveOSx <span style={{ color: "black", fontWeight: "light" }}>Account</span>
                    </Typography>

                </Typography>
                <Typography sx={{ color: "#4285f4", cursor: "pointer" }} aria-controls="menu-appbar"
                    aria-haspopup="true"><AppsRoundedIcon sx={{fontSize:"1.8vw"}}/></Typography>
            </Toolbar>
        </AppBar>
        </Box>
            
       
    );
}
