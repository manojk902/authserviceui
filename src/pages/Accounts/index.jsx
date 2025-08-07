import { Container } from "@mui/material";
import Header from "./components/compound/Header";
import WelcomeSection from "./components/compound/WelcomeSection";
import BasicInfo from "./components/compound/BasicInfo";
import ContactInfo from "./components/compound/ContactInfo";
import SecurityInfo from "./components/compound/SecurityInfo";
import SaveChanges from "./components/molecule/SaveChanges";
// import { Component } from "react";

const Accounts = () => {
    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 6, py: 4 }}>
                <WelcomeSection />
                <BasicInfo />
                <ContactInfo />
                <SecurityInfo />
                <SaveChanges/>
            </Container>

        </>
    );
}
export default Accounts;