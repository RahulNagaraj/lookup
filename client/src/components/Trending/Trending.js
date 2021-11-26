import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
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

import Loader from "../../common/Loader";
import { topRatedServicesRequest } from "../../redux/actions/analyticsActions";

const filterKeys = ["id", "name", "location", "categories"];

const formatColumns = (data) => {
    if (data.length > 0) {
        let cols = [];
        Object.keys(data[0]).forEach((key) => {
            if (filterKeys.includes(key)) {
                let label = key.toUpperCase();
                if (key === "location") {
                    label = "Address";
                } else if (key === "categories") {
                    label = "Services Offered";
                } else if (key === "name") {
                    label = "Name";
                } else if (key === "id") {
                    label = "ID";
                }
                cols.push({
                    id: key,
                    label: label,
                    align: "left",
                });
            }
        });
        return cols;
    } else {
        return [];
    }
};

const Trending = () => {
    const dispatch = useDispatch();
    const analyticsState = useSelector((state) => state.analytics);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
        if (
            !analyticsState.isFetching &&
            analyticsState.data.length === 0 &&
            analyticsState.error === ""
        ) {
            dispatch(topRatedServicesRequest());
        }
    }, [analyticsState]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let COLUMNS = [];

    if (
        !analyticsState.isFetching &&
        analyticsState.error === "" &&
        analyticsState.data
    ) {
        COLUMNS = formatColumns(analyticsState.data);
    }

    if (analyticsState.isFetching) return <Loader />;

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
                            {analyticsState.data
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            {COLUMNS.map((column) => {
                                                let value = row[column.id];
                                                if (column.id === "location") {
                                                    value = `${
                                                        value.address1
                                                            ? value.address1
                                                            : ""
                                                    }, ${value.city}, ${
                                                        value.state
                                                    } - ${value.zip_code}`;
                                                } else if (
                                                    column.id === "categories"
                                                ) {
                                                    value = value
                                                        .map((v) => v.title)
                                                        .join(", ");
                                                } else if (column.id === "id") {
                                                    value = index + 1;
                                                }

                                                return (
                                                    <TableCell
                                                        key={column.name}
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
                    count={analyticsState.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Trending;
