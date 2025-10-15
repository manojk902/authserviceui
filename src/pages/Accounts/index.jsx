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
import { useNavigate } from "react-router-dom";
// import { Component } from "react";

const Accounts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.loginUser?.loginUserData);
    const user = useSelector((state) => state.user?.userData);
    const userLoading = useSelector((state) => state.user?.loading);
    const userInfo = useSelector((state) => state.userInfo?.userInfoData);
    const userInfoLoading = useSelector((state) => state.userInfo?.loading);

    const loading = userLoading || userInfoLoading;
    
    useEffect(() => {
        if (loginUser?.id) {
            dispatch(fetchUserData(loginUser?.id))
            dispatch(fetchUserInfoData(loginUser?.id))
        }else{
            navigate('/')
        }

    }, [dispatch, loginUser?.id, navigate])

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
            <Header firstName={user?.firstName} loading={loading} />
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 6, py: 4 }}>
                <WelcomeSection  userId={loginUser?.id} firstName={user?.firstName} lastName={user?.lastName} userPhoto={userInfo?.user_photo} loading={loading} />
                <BasicInfo userName={user?.username} firstName={user?.firstName} lastName={user?.lastName} dob={userInfo?.dob } gender={userInfo?.gender } userPhoto={userInfo?.user_photo} isEditable={isEditable.basicInfo} setIsEditable={() => toggleEdit("basicInfo")} loading={loading} />
                <ContactInfo email={user?.email} phoneNumber={user?.phoneNumber } home={userInfo?.home_address } work={userInfo?.work_address } isEditable={isEditable.contactInfo} setIsEditable={() => toggleEdit("contactInfo")} loading={loading} />
                <SecurityInfo recoveryEmail={user?.recoveryEmail } isEditable={isEditable.securityInfo} setIsEditable={() => toggleEdit("securityInfo")} loading={loading} />
            </Container>

        </>
    );
}
export default Accounts;