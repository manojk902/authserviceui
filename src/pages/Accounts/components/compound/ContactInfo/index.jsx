import CommonSection from "../../molecule/CommonSection";

const ContactInfo = () => {
    return (
        <CommonSection title="Contact Info" rows={[{ label: "Email", value: "mk@example.com" }, { label: "Phone", value: "0000000000" },{ label: "Home", value: "Home address" },{ label: "Work", value: "Work Address" }]} />
    )
}
export default ContactInfo;