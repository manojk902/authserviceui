import CommonSection from "../../molecule/CommonSection";

const BasicInfo = ({userName, firstName, lastName, dob, gender, isEditable, setIsEditable }) => {
    console.log("BasicInfo props:", {userName, firstName, lastName, dob, gender});
    return (
        <CommonSection
            title="Basic Info"
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            rows={[{ label: "Username", value: `${userName}`, isInput:false }, { label: "Name", type:"text", isInput:true, value: `${firstName} ${lastName}` }, { label: "Birthday", type:"date", isInput:true,  value: `${dob}` }, { label: "Gender", type:"text", isInput:true,  value: `${gender}` }]}
        />
    )
}
export default BasicInfo;