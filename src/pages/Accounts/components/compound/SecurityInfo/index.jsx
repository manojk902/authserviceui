import { Button } from "@mui/material";
import CommonSection from "../../molecule/CommonSection";

const SecurityInfo = () => {
    return (
        <CommonSection title="Security Info" rows={[{ label: "Recovery Email", value: "recovery@example.com" }, { label: "Reset Password", value: "**********" },{ label: "Deactivate account", value: <Button color="error" variant="outlined">Deactivate</Button> },{ label: "Delete account", value: <Button color="error" variant="contained">Delete</Button> }]} />
    )
}
export default SecurityInfo;