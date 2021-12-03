import * as React from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";

const formatColumns = (name) => {
    if (name === "name") return "Name";
    else if (name === "zipcode") return "Zipcode";
    else if (name === "count") return "Count";
    else if (name === "city") return "City";
    else if (name === "state") return "State";
    else if (name === "country") return "Country";
    else if (name === "firstName") return "First Name";
    else if (name === "lastName") return "Last Name";
    else if (name === "rating") return "Rating";
    else if (name === "review_count") return "Review Count";
    else if (name === "categories") return "Categories";
    else if (name === "count") return "Count";
    return name;
};

const InfluentialTable = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {props.columns.map((column) => (
                                    <TableCell key={column}>
                                        {formatColumns(column)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row}
                                        >
                                            {props.columns.map((column) => {
                                                const value = row[column];
                                                return (
                                                    <TableCell key={column}>
                                                        {[
                                                            "categories",
                                                        ].includes(column)
                                                            ? value.join(", ")
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default InfluentialTable;
