import CommonSection from "../../molecule/CommonSection";

const BasicInfo = () => {
    return (
        <CommonSection title="Basic Info" rows={[{ label: "Name", value: "Mukesh Kumar" }, { label: "Birthday", value: "00/00/0000" }, { label: "Gender", value: "Male" }]} />
    )
}
export default BasicInfo;