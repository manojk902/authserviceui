import CommonSection from "../../molecule/CommonSection";

const ContactInfo = ({email, phoneNumber, home, work, isEditable, setIsEditable }) => {
    return (
        <CommonSection
            title="Contact Info"
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            rows={[{ label: "Email", isInput:true, type:"email", value: `${email}` }, { label: "Phone", type:"tel",isInput:true, value: `${phoneNumber}` }, { label: "Home", type:"text",isInput:true, value: `${home}` }, { label: "Work", type:"text", isInput:true, value: `${work}` }]}
        />
    )
}
export default ContactInfo;