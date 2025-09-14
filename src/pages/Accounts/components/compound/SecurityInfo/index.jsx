import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PasswordIcon from '@mui/icons-material/Password';
import CommonSection from "../../molecule/CommonSection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { request } from "../../../../../utils/request";
import { useNavigate } from "react-router-dom";

const SecurityInfo = ({ recoveryEmail, isEditable, setIsEditable }) => {
    const navigate = useNavigate();
    const loginUser = useSelector((state) => state.loginUser?.loginUserData)
    // -------------------------------------------------------------------------HANDLE DEACTIVATE
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDeactivate = () => {
        setOpen(true);
    };

    const handleCloseDeactivate = () => {
        setOpen(false);
    };

    const handleDeactivate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const text = formJson.text;
        if (loginUser?.id && text) {
            try {
                const deactivateRes = await request({
                    method: "post",
                    url: "deactivate-account",
                    data: {
                        id: loginUser.id,
                        deactivateReason: text,
                    },
                });

                if (deactivateRes.status === "success") {
                    toast.success(deactivateRes.message);
                    navigate("/")
                } else {
                    toast.error("Something want wrong!")
                }
            } catch (error) {
                console.error("Deactivate account error:", error);
                toast.error("Failed to deactivate account. Please try again!");
            }

            console.log("Deactivate reason => ", text, loginUser?.id);
        }

        handleCloseDeactivate();
    };

    // --------------------------------------------------------------------------HANDLE DELETE
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const deleteText = formJson.deleteText;
        if (deleteText === "DELETE DRIVEOSX ACCOUNT") {
            if (loginUser?.id && deleteText) {
                try {
                    const deleteRes = await request({
                        method: "delete",
                        url: "/delete-account",
                        data: {
                            id: loginUser.id,
                            deleteText: deleteText
                        }
                    })
                    console.log("delete res ->", deleteRes)
                    if (deleteRes.status === "success") {
                        toast.success(deleteRes.message)
                        console.log("Delet success => ");
                        navigate("/")
                    } else {
                        toast.error(deleteRes.message)
                        console.log("Delet Failed => ");

                    }
                } catch (error) {
                    toast.error("Failed to delete account, Please try again!")
                }
            }

        } else {
            toast.error("Text not matched")
        }
        handleCloseDelete();
    };

    // ------------------------------------------------------------------------HANDLE RESET PASSWORD
    const [openReset, setOpenReset] = React.useState(false);

    const handleClickOpenReset = () => {
        setOpenReset(true);
    };

    const handleCloseReset = () => {
        setOpenReset(false);
    };
    const handleResetPassword = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const password = formJson.password;
        console.log("type of psd =>", typeof password, loginUser?.email, password)
        if (password && loginUser?.email) {
            try {
                const isSamePassword = await request({
                    method: "post",
                    url: "check-password",
                    data: {
                        email: loginUser?.email,
                        password: password
                    }
                })
                console.log("same password =>", isSamePassword)
                if (isSamePassword.status === "success" && isSamePassword.isPasswordMatch) {
                    navigate("/forgot-password")
                    toast.success("Now you can reset password")
                } else {
                    toast.error("Wrong Password")
                }
            } catch (error) {
                toast.error("Something want wrong, Please try again.")
            }
        } else {
            toast.error("Enter your current password")
        }
        handleCloseReset();
    };

    return (
        <>
            <CommonSection
                title="Security Info"
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                rows={[
                    { key: "recovery_email", label: "Recovery Email", type: "email", isInput: true, value: `${recoveryEmail}`, placeholder: "Recovery Email. demo@example.com", source: "user" },
                    { label: "Reset Password", value: <>********** <Button sx={{ fontSize: ".8vw", '&:hover':{backgroundColor:"transparent"} }} onClick={handleClickOpenReset}>Change Password</Button></> },
                    { label: "Deactivate account", value: <Button color="warning" variant="outlined" onClick={handleClickOpenDeactivate}>Deactivate</Button> },
                    { label: "Delete account", value: <Button color="error" variant="contained" onClick={handleClickOpenDelete}>Delete</Button> }
                ]}
            />

            {/* Deactivate--------- */}
            <Dialog open={open} onClose={handleCloseDeactivate}>
                <DialogTitle sx={{ fontWeight: "bold", alignItems:"center", display:"flex", gap:1 }}><PersonOffIcon sx={{border:".15vw solid black", borderRadius:"10%", p:".2vw"}}/> DEACTIVATE ACCOUNT</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Deactivating your account will limit your access until you reactivate. Please share your reason below.
                    </DialogContentText>
                    <form onSubmit={handleDeactivate} id="deactivation-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="text"
                            label="Reason for deactivation?"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="dark" onClick={handleCloseDeactivate}>CANCEL</Button>
                    <Button color="warning" type="submit" form="deactivation-form" sx={{ backgroundColor: "#ed6c03", color: "white" }}>
                        CONFIRM DEACTIVATE
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete---------- */}
            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle sx={{ backgroundColor: "red", color: "white", fontWeight: "bold", alignItems:"center", display:"flex", gap:1 }}><PersonRemoveIcon sx={{border:".15vw solid white", borderRadius:"10%",p:".2vw"}}/> DELETE ACCOUNT</DialogTitle>
                <DialogContent sx={{ backgroundColor: "red" }}>
                    <DialogContentText sx={{ color: "white", mb: 2 }}>
                        This action is permanent and cannot be undone. To confirm, please type <b>"DELETE DRIVEOSX ACCOUNT"</b> below.
                    </DialogContentText>
                    <form onSubmit={handleSubmitDelete} id="deletion-form">
                        <TextField
                            // autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="deleteText"
                            type="text"
                            fullWidth
                            variant="standard"
                            color="white"
                            InputProps={{
                                disableUnderline: true, // removes underline/border
                                sx: {
                                    px: "1vw",           // optional right padding
                                    backgroundColor: "white",
                                    borderRadius: ".2vw", // optional rounded edges
                                    '&:focus-within': {
                                        backgroundColor: "white"
                                    }
                                },
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "red" }}>
                    <Button onClick={handleCloseDelete} sx={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}>Cancel</Button>
                    <Button type="submit" form="deletion-form" sx={{ backgroundColor: "white", color: "red", fontWeight: "bold" }}>
                        CONFIRM DELETE
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reset password */}
            <Dialog open={openReset} onClose={handleCloseReset}>
                <DialogTitle sx={{ backgroundColor: "#458eda", color: "white", fontWeight:"bold",alignItems:"center", display:"flex", gap:1  }}><PasswordIcon sx={{border:".15vw solid white", borderRadius:"10%",p:".2vw"}}/> ENTER CURRENT PASSWORD</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#458eda", color: "white" }}>
                    {/* <DialogContentText >
                        Deactivating your account will limit your access until you reactivate. Please share your reason below.
                    </DialogContentText> */}
                    <form onSubmit={handleResetPassword} id="passwordReset-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="password"
                            // label="Reason for passwordReset?"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="dark" onClick={handleCloseReset}>CANCEL</Button>
                    <Button color="warning" type="submit" form="passwordReset-form" sx={{ backgroundColor: "#458eda", color: "white" }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default SecurityInfo;