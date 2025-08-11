import CommonSection from "../../molecule/CommonSection";
import { useSelector } from "react-redux";

const ContactInfo = ({ isEditable, setIsEditable }) => {
    const user = useSelector((state) => state.user?.userData);
    const userInfo = useSelector((state) => state.userInfo?.userInfoData);
    return (
        <CommonSection
            title="Contact Info"
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            rows={[{ label: "Email", isInput:true, type:"email", value: `${user.email}` }, { label: "Phone", type:"tel",isInput:true, value: `${user.phoneNumber}` }, { label: "Home", type:"text",isInput:true, value: `${userInfo.home_address}` }, { label: "Work", type:"text", isInput:true, value: `${userInfo.work_address}` }]}
        />
    )
}
export default ContactInfo;