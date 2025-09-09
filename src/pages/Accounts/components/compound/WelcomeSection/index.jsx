import { Box, Button, Typography } from "@mui/material";
import ProfileImg from '../../../../../assets/img/profile.webp'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import SaveIcon from '@mui/icons-material/Save';
import styles from './WelcomeSection.module.css';
import { useEffect, useState } from "react";
import { request } from "../../../../../utils/request";

const WelcomeSection = ({ userId, firstName, lastName }) => {
    const [previewImg, setPreviewImg] = useState(ProfileImg);
    const [isImageSelected, setIsImageSelected] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
            setIsImageSelected(true); // ✅ user picked a new image
        }
    };

    useEffect(() => {
        const getUserPhoto = async () => {
            if (userId) {
                try {
                    const resData = await request({
                        method: "get",
                        url: `get-user-photo/${userId}`,
                    });
                    if (resData.status === "success" && resData.userPhoto) {
                        setPreviewImg(resData.userPhoto);
                        setIsImageSelected(false); // fetched from backend → not a "new" selection
                    } else {
                        setPreviewImg(ProfileImg);
                        setIsImageSelected(false);
                        console.warn("No user photo found, using default.");
                    }
                } catch (error) {
                    console.error("Error fetching user photo:", error);
                }
            }
        };
        getUserPhoto();
    }, [userId]);

    return (
        <Box
            gap={3}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                py: "4vw",
            }}
        >
            <Box className={styles.imageContainer}>
                <Box
                    component="img"
                    sx={{ width: "100%" }}
                    src={previewImg}
                    alt="profile-img"
                />
                <Button component="label" className={styles.imageSelectorBtn}>
                    <PermMediaIcon
                        sx={{
                            p: ".6vw",
                            fontSize: "3vw",
                            borderRadius: ".8vw",
                            backgroundColor: "#4285f4",
                            color: "white",
                        }}
                    />
                    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </Button>

                {isImageSelected && (
                    <Button className={styles.imageSaveBtn}>
                        <SaveIcon sx={{ fontSize: "1.5vw", color: "green" }} />
                    </Button>
                )}
            </Box>

            <Box>
                <Typography variant="h3" fontSize="2.5vw">
                    Welcome, {firstName} {lastName}
                </Typography>
            </Box>
            <Box>
                <Typography variant="p" fontSize="1.8">
                    Manage your info and security to make DriveOSx work better for you.
                </Typography>
            </Box>
        </Box>
    );
};

export default WelcomeSection;
