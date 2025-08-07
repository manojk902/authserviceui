import { Box, Table, TableBody, TableRow, Typography } from "@mui/material";

const CommonSection = ({ title, rows }) => {
    return (
        <Box elevation={2} gap={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", py: "2vw", px: "2vw", boxShadow: 2, borderRadius: ".8vw" }}>
            <Box><Typography variant="h4" fontSize="2vw">{title}</Typography></Box>
            <Table sx={{}} aria-label="simple table">

                <TableBody>
                    {rows?.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, display: "flex", pl: "2vw", alignItems: "center", borderTop: "1px solid black", width: "100%" }}
                        >
                            <Box component="p" sx={{ fontSize: "1vw", width: "25%" }}>{row.label}</Box>
                            <Box component="p" sx={{ fontSize: "1.3vw", width: "75%" }} >{row.value}</Box>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </Box>
    )
}
export default CommonSection;