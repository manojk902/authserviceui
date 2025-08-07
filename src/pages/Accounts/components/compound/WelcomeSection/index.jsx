
import { Box, Button, Typography } from "@mui/material";
import ProfileImg from '../../../../../assets/img/profile.webp'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import styles from './WelcomeSection.module.css';
import { useState } from "react";

const WelcomeSection = () => {
    const [previewImg, setPreviewImg] = useState(ProfileImg);
    const handleImageChange =(e)=>{
        const file = e.target.files?.[0];
        if(file){
            setPreviewImg(URL.createObjectURL(file));
        }
    }
    return (
        <Box gap={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: "4vw" }}>
            <Box className={styles.imageContainer}>
                <Box component="img" sx={{ width: "100%" }} src={previewImg} alt="profile img" />
                <Button component="label" className={styles.imageSelectorBtn} > 
                    <PermMediaIcon sx={{p:".6vw", fontSize:"3vw",borderRadius:".8vw", backgroundColor:"black", color:"white"}}/>
                    <input type="file" accept="image/*" hidden  onChange={handleImageChange}/>
                </Button>
            </Box>
            <Box><Typography variant="h3" fontSize="2.5vw">Welcome, {user.firstName} {user.lastName}</Typography></Box>
            <Box><Typography variant="p" fontSize="1.8">Manage your info and security to make DriveOSx work better for you.</Typography></Box>
        </Box>
    )
}
export default WelcomeSection;