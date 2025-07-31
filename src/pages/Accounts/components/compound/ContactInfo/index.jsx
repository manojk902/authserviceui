import CommonSection from "../../molecule/CommonSection";

const ContactInfo = () => {
    return (
        <CommonSection title="Contact Info" rows={[{ label: "Email", value: "mk@example.com" }, { label: "Phone", value: "0000000000" }]} />
    )
}
export default ContactInfo;