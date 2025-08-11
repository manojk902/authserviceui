import { Button } from "@mui/material";
import CommonSection from "../../molecule/CommonSection";
import { useSelector } from "react-redux";

const SecurityInfo = ({ isEditable, setIsEditable }) => {
    const user = useSelector((state) => state.user?.userData);
    return (
        <CommonSection
            title="Security Info"
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            rows={[{ label: "Recovery Email", type:"email",isInput:true, value: `${user.recoveryEmail}` }, { label: "Reset Password", value: "**********" }, { label: "Deactivate account", value: <Button color="error" variant="outlined">Deactivate</Button> }, { label: "Delete account", value: <Button color="error" variant="contained">Delete</Button> }]}
        />
    )
}
export default SecurityInfo;