import { Container } from "@mui/material";
import Header from "./components/compound/Header";
import WelcomeSection from "./components/compound/WelcomeSection";
import BasicInfo from "./components/compound/BasicInfo";
import ContactInfo from "./components/compound/ContactInfo";
import SecurityInfo from "./components/compound/SecurityInfo";
import { useState } from "react";
// import { Component } from "react";

const Accounts = () => {
   
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
            <Header />
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 6, py: 4 }}>
                <WelcomeSection />
                <BasicInfo isEditable={isEditable.basicInfo} setIsEditable={() => toggleEdit("basicInfo")} />
                <ContactInfo isEditable={isEditable.contactInfo} setIsEditable={() => toggleEdit("contactInfo")} />
                <SecurityInfo isEditable={isEditable.securityInfo} setIsEditable={() => toggleEdit("securityInfo")} />
            </Container>

        </>
    );
}
export default Accounts;