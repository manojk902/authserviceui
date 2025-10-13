import CommonSection from "../../molecule/CommonSection";

const ContactInfo = ({email, phoneNumber, home, work, isEditable, setIsEditable }) => {
    return (
        <CommonSection
            title="Contact Info"
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            rows={[
                {key:"email", label: "Email", isInput:true, type:"email", value: `${email}`, placeholder:"demo@example.com", source: "user" }, 
                {key:"phone_number", label: "Phone", type:"tel",isInput:true, value: `${phoneNumber}`, placeholder:"Must be 10 digits. start with 9,8,7", source: "user" }, 
                {key:"home_address", label: "Home", type:"text",isInput:true, value: `${home}`, placeholder:"Home address", source: "userInfo" }, 
                {key:"work_address", label: "Work", type:"text", isInput:true, value: `${work}`, placeholder:"Work address", source: "userInfo" }
            ]}
        />
    )
}
export default ContactInfo;