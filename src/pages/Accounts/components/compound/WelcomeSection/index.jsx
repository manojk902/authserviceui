import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import ProfileImg from '../../../../../assets/img/profile.webp';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import SaveIcon from '@mui/icons-material/Save';
import styles from './WelcomeSection.module.css';
import { useEffect, useState } from "react";
import { request } from "../../../../../utils/request";

const WelcomeSection = ({ userId, firstName, lastName, loading }) => {
    const [previewImg, setPreviewImg] = useState(ProfileImg);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState(previewImg);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
            setSelectedFile(file);
            setIsImageSelected(true);
        }
    };

    useEffect(() => {
        const getUserPhoto = async () => {
            if (!userId) return;
            try {
                const resData = await request({
                    method: "get",
                    url: `get-user-photo/${userId}`,
                });

                if (resData.status === "success" && resData.userPhoto) {
                    setPreviewImg(resData.userPhoto);
                    setIsImageSelected(false);
                } else {
                    setPreviewImg(ProfileImg);
                    setIsImageSelected(false);
                    console.warn("No user photo found, using default.");
                }
            } catch (error) {
                console.error("Error fetching user photo:", error);
            }
        };

        getUserPhoto();
    }, [userId]);


    const updateUserPhoto = async () => {
        if (!selectedFile) return;

        try {
            const formData = new FormData();
            formData.append("id", userId);
            formData.append("user_photo", selectedFile);

            const resData = await request({
                method: "put",
                url: `update-user-photo`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (resData.status === "success") {
                setPreviewImg(URL.createObjectURL(selectedFile));
                setIsImageSelected(false);
                setSelectedFile(null);
            } else {
                console.error("Failed to update user photo:", resData.message);
            }
        } catch (error) {
            console.error("Error updating user photo:", error);
        }
    };

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
                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <>
                        <Box
                            component="img"
                            sx={{ width: "100%" }}
                            src={previewImg}
                            alt="profile-img"
                        />
                        <Button component="label" className={styles.imageSelectorBtn}>
                            <Tooltip title="Select Photo" placement="top" arrow><PermMediaIcon
                                sx={{
                                    p: ".6vw",
                                    fontSize: "3vw",
                                    borderRadius: ".8vw",
                                    backgroundColor: "#4285f4",
                                    color: "white",
                                }}
                            />
                            </Tooltip>
                            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                        </Button>

                        {isImageSelected && (
                            <Button className={styles.imageSaveBtn} onClick={updateUserPhoto}>
                                <Tooltip title="Save Photo" placement="top" arrow><SaveIcon sx={{ fontSize: "1.8vw", color: "green" }} /></Tooltip>
                            </Button>
                        )}
                    </>
                )}

            </Box>

            <Box>
                <Typography variant="h3" fontSize="2.5vw">
                    Welcome, {loading ? ("Content Loading...") : (`${ firstName } ${ lastName }`)}
                </Typography>
            </Box>
            <Box>
                <Typography fontSize="1.4vw">
                    Manage your info and security to make DriveOSx work better for you.
                </Typography>
            </Box>
        </Box>
    );
};

export default WelcomeSection;
