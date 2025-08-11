import CommonSection from "../../molecule/CommonSection";
import { useSelector } from "react-redux";

const BasicInfo = ({ isEditable, setIsEditable }) => {
    const user = useSelector((state) => state.user?.userData);
    const userInfo = useSelector((state) => state.userInfo?.userInfoData);
    return (
        <CommonSection
            title="Basic Info"
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            rows={[{ label: "Username", value: `${user.userName}`, isInput:false }, { label: "Name", type:"text", isInput:true, value: `${user.firstName} ${user.lastName}` }, { label: "Birthday", type:"date", isInput:true,  value: `${userInfo.dob}` }, { label: "Gender", type:"text", isInput:true,  value: `${userInfo.gender}` }]}
        />
    )
}
export default BasicInfo;