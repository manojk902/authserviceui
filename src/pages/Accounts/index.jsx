import { Container } from "@mui/material";
import Header from "./components/compound/Header";
import WelcomeSection from "./components/compound/WelcomeSection";
import BasicInfo from "./components/compound/BasicInfo";
import ContactInfo from "./components/compound/ContactInfo";
import SecurityInfo from "./components/compound/SecurityInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/userSlice";
import { fetchUserInfoData } from "../../redux/slices/userInfoSlice";
// import { Component } from "react";

const Accounts = () => {
    const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.loginUser?.loginUserData);
    const user = useSelector((state) => state.user?.userData);
    const userInfo = useSelector((state) => state.userInfo?.userInfoData);
    console.log("User data in Accounts page:", user.firstName);
    console.log("User info data photo in Accounts page:", userInfo);
   
    useEffect(() => {
        if (loginUser?.id) {
            dispatch(fetchUserData(loginUser?.id))
            dispatch(fetchUserInfoData(loginUser?.id))
        }

    }, [dispatch, loginUser?.id])

    const [isEditable, setIsEditable] = useState({
        basicInfo: false,
        contactInfo: false,
        securityInfo: false
    });

    // toggle specific section
    const toggleEdit = (section) => {
        setIsEditable((prev) => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    return (
        <>
            <Header firstName={user?.firstName} />
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 6, py: 4 }}>
                <WelcomeSection userId={loginUser?.id} firstName={user?.firstName} lastName={user?.lastName} />
                <BasicInfo userName={user?.username} firstName={user?.firstName} lastName={user?.lastName} dob={userInfo?.dob || "Not Specified"} gender={userInfo?.gender || "Not Specified"} isEditable={isEditable.basicInfo} setIsEditable={() => toggleEdit("basicInfo")} />
                <ContactInfo email={user?.email} phoneNumber={user?.phoneNumber || "Not Specified"} home={userInfo?.home_address || "Not Specified"} work={userInfo?.work_address || "Not Specified"} isEditable={isEditable.contactInfo} setIsEditable={() => toggleEdit("contactInfo")} />
                <SecurityInfo recoveryEmail={user?.recoveryEmail || "Not Specified"} isEditable={isEditable.securityInfo} setIsEditable={() => toggleEdit("securityInfo")} />
            </Container>

        </>
    );
}
export default Accounts;