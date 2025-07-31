import CommonSection from "../../molecule/CommonSection";

const AddressInfo = () => {
    return (
        <CommonSection title="Address Info" rows={[{ label: "Home", value: "Home address" }, { label: "Work", value: "Work Address" }]} />
    )
}
export default AddressInfo;