import { Box, Typography } from "@mui/material";
import ProfileImg from '../../../../../assets/img/profile.webp'

const WelcomeSection = ()=>{
    return(
        <Box gap={3} sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", py:"4vw"}}>
            <Box sx={{backgroundColor:"red", width:"10vw", height:"10vw", textAlign:"center" , alignContent:"center", borderRadius:"100%"}}>
                <Box component="img" sx={{width:"100%"}} src={ProfileImg} alt="profile img"/>
            </Box>
            <Box><Typography variant="h3" fontSize="2.5vw">Welcome, Mukesh Kumar</Typography></Box>
            <Box><Typography variant="p" fontSize="1.8">Manage your info and security to make DriveOSx work better for you.</Typography></Box>
        </Box>
    )
}
export default WelcomeSection;