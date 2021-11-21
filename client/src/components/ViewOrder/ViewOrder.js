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
import { useQuery } from "@apollo/client";
import { ViewOrderQuery } from "../../graphql";
import Loader from "../../common/Loader";
import { useSelector } from "react-redux";

const formatColumns = (data) => {
    if (data.length > 0) {
        let cols = [];
        Object.keys(data[0]).forEach((key) => {
            if (key !== "__typename") {
                cols.push({
                    id: key,
                    label: key.toUpperCase(),
                    align: "left",
                });
            }
        });
        return cols;
    } else {
        return [];
    }
};

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const userState = useSelector((state) => state.user);
    const userId = userState.userDetails.id;
    const { loading, error, data } = useQuery(
        ViewOrderQuery.VIEW_ORDER_BY_USER_ID,
        {
            variables: { userId },
        }
    );
    let COLUMNS = [];

    if (!loading && !error && data) {
        COLUMNS = formatColumns(data?.viewOrderByUserId);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <Loader />;

    return (
        <Box sx={{ m: 2 }}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {COLUMNS.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.viewOrderByUserId
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
                                            key={row.id}
                                        >
                                            {COLUMNS.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {value}
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
                    count={data.viewOrderByUserId.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
