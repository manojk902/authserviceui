import CommonSection from "../../molecule/CommonSection";

const BasicInfo = ({userName, firstName, lastName, dob, gender,userPhoto, isEditable, setIsEditable, loading }) => {
    return (
        <CommonSection
            title="Basic Info"
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            rows={[
                {key:"username", label: "Username", value: `${userName}`, isInput:false, source: "user", loading:loading }, 
                {key:"name", label: "Name", type:"text", isInput:true, value: `${firstName} ${lastName}`, placeholder:"Firstname Lastname", source: "user", loading:loading }, 
                {key:"dob", label: "Birthday", type:"date", isInput:true,  value: `${dob}`, source: "userInfo",loading:loading }, 
                {key:"gender", label: "Gender", type:"text", isInput:true,  value: `${gender}`, placeholder:"must be one of them : Male, Female, Other, Not Specified" , source: "userInfo", loading:loading },
            ]}
        />
    )
}
export default BasicInfo;