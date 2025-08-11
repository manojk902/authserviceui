import { Box, Table, TableBody, TableRow, TextField, Typography } from "@mui/material";
import styles from './CommonSection.module.css';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useState } from "react";

const CommonSection = ({ title, rows, isEditable, setIsEditable }) => {
    const [localRows, setLocalRows] = useState(rows);
    const handleClick = () => {
        setIsEditable()
    }
    const handleChange = (index, value) => {
        setLocalRows(prev => prev.map((row, i) => i === index ? { ...row, value } : row));
    }

    const saveChanges = () => {
        console.log(`Changes saved for ${title}:`, localRows);
        setIsEditable({
            basicInfo: false,
            contactInfo: false,
            securityInfo: false,
        });
    };
   
    return (
        <Box className={styles.commonSectionCover} elevation={2} gap={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", py: "2vw", px: "2vw", boxShadow: 2, borderRadius: ".8vw" }}>
            <Box className={styles.titleCover}>
                <Typography variant="h4" fontSize="2vw">{title}</Typography>
                {(isEditable) ?
                    <>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                            <EditOffIcon onClick={handleClick} className={styles.editBtn} sx={{ color: "red" }} />
                            <SaveAsIcon color="success" onClick={saveChanges} className={styles.saveBtn} />
                        </Box>
                    </> : <EditIcon onClick={handleClick} className={styles.editBtn} />}

            </Box>
            <Table sx={{}} aria-label="simple table">

                <TableBody>
                    {localRows?.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, display: "flex", pl: "2vw", py: '.5vw', alignItems: "center", borderTop: "1px solid black", width: "100%" }}
                        >
                            <Box component="p" sx={{ fontSize: "1vw", width: "25%" }}>{row.label}</Box>
                            {(isEditable && row.isInput) ? <TextField type={row.type} value={row.value} onChange={(e) => handleChange(index, e.target.value)} className={styles.inputField} /> : <Box component="p" sx={{ fontSize: "1.3vw", width: "75%" }} >{row.value}</Box>}

                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </Box>
    )
}
export default CommonSection;