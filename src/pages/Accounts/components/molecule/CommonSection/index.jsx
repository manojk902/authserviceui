import { Box, Table, TableBody, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import styles from './CommonSection.module.css';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserData } from "../../../../../redux/slices/userSlice";
import { fetchUserInfoData, updateUserInfoData } from "../../../../../redux/slices/userInfoSlice";

const CommonSection = ({ title, rows, isEditable, setIsEditable }) => {
    const loginUser = useSelector((state) => state.loginUser?.loginUserData);
    const user = useSelector((state) => state.user?.userData);
    const userInfo = useSelector((state) => state.userInfo?.userInfoData);
    const dispatch = useDispatch();
    const [localRows, setLocalRows] = useState(rows);

    useEffect(() => {
        setLocalRows(rows);
    }, [rows]);

    const handleClick = () => {
        setIsEditable()
    }
    const handleChange = (index, value) => {
        setLocalRows(prev => prev.map((row, i) => i === index ? { ...row, value } : row));
    }

    const saveChanges = () => {
        const userUpdates = {};
        const userInfoUpdates = {};
        localRows.forEach(row => {
            if (row.source === "user") {
                userUpdates[row.key.toLowerCase()] = row.value;
            } else if (row.source === "userInfo") {
                userInfoUpdates[row.key.toLowerCase()] = row.value;
            }
        })

        if (Object.keys(userUpdates).length > 0) {
            if (loginUser?.id) {
                userUpdates.id = loginUser.id;
                userUpdates.first_name = userUpdates.name?.split(" ")[0] || user.firstName;
                userUpdates.last_name = userUpdates.name?.split(" ")[1] || user.lastName;
                userUpdates.email = userUpdates.email || user.email;
                userUpdates.phone_number = userUpdates.phone_number || user.phoneNumber;
                userUpdates.recovery_email = userUpdates.recovery_email || user.recoveryEmail;
                dispatch(updateUserData(userUpdates)).then(()=>{
                    dispatch(fetchUserData(loginUser?.id))
                });
            }
            // Call API or dispatch action to save user updates
        }
        if (Object.keys(userInfoUpdates).length > 0) {
            if (loginUser?.id) {
                const formatDate = (date) => {
                    if (!date) return null;
                    const d = new Date(date);
                    if (isNaN(d.getTime())) return null; 
                    return d.toISOString().split("T")[0]; 
                };

                userInfoUpdates.id = loginUser.id;
                // userInfoUpdates.user_photo = userInfoUpdates.user_photo || userInfo.user_photo;
                userInfoUpdates.dob = formatDate(userInfoUpdates.dob) || userInfo.dob || "";
                userInfoUpdates.gender = userInfoUpdates.gender || userInfo.gender || "";
                userInfoUpdates.home_address = userInfoUpdates.home_address || userInfo.home_address || "";
                userInfoUpdates.work_address = userInfoUpdates.work_address || userInfo.work_address || "";
                dispatch(updateUserInfoData(userInfoUpdates)).then(()=>{
                    dispatch(fetchUserInfoData(loginUser?.id))
                });
            }
        }

        setIsEditable({
            basicInfo: false,
            contactInfo: false,
            securityInfo: false,
        });
    };

    const discardChanges = () => {
        setLocalRows(rows);
        setIsEditable({
            basicInfo: false,
            contactInfo: false,
            securityInfo: false,
        });
    }

    return (
        <Box className={styles.commonSectionCover} elevation={2} gap={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", py: "2vw", px: "2vw", boxShadow: 2, borderRadius: ".8vw" }}>
            <Box className={styles.titleCover}>
                <Typography variant="h4" fontSize="2vw">{title}</Typography>
                {(isEditable) ?
                    <>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                            <Tooltip title="Discard Changes" placement="top" arrow><EditOffIcon onClick={discardChanges} className={styles.editBtn} sx={{ color: "red" }} /></Tooltip>
                            <Tooltip title="Save Changes" placement="top" arrow><SaveAsIcon color="success" onClick={saveChanges} className={styles.saveBtn} /></Tooltip>
                        </Box>
                    </> : <Tooltip title="Edit" placement="top" arrow><EditIcon onClick={handleClick} className={styles.editBtn} /></Tooltip>}

            </Box>
            <Table sx={{}} aria-label="simple table">

                <TableBody>
                    {localRows?.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, display: "flex", pl: "2vw", py: '.5vw', alignItems: "center", borderTop: "1px solid black", width: "100%" }}
                        >
                            <Box component="p" sx={{ fontSize: "1vw", width: "25%" }}>{row.label}</Box>
                            {(isEditable && row.isInput) ? <TextField type={row.type} value={row.value} placeholder={row.placeholder} onChange={(e) => handleChange(index, e.target.value)} className={styles.inputField} /> : <Box component="p" sx={{ fontSize: "1.3vw", width: "75%" }} >{row.value}</Box>}

                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </Box>
    )
}
export default CommonSection;