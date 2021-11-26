import * as React from "react";
import { useDispatch } from "react-redux";
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
import { useSelector } from "react-redux";
import { dateFormat } from "../../common/util";
import {
    viewAllOrdersRequest,
    viewOrdersByUserIdRequest,
    setViewAllOrders,
} from "../../redux/actions/viewOrdersActions";

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
    const dispatch = useDispatch();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const userState = useSelector((state) => state.user);
    const viewOrderState = useSelector((state) => state.viewOrders);

    const userId = userState.userDetails.id;

    React.useEffect(() => {
        if (
            !viewOrderState.isFetching &&
            viewOrderState.data.length === 0 &&
            viewOrderState.error === ""
        ) {
            if (viewOrderState.setAllViewOrders) {
                dispatch(setViewAllOrders(false));
                dispatch(viewAllOrdersRequest());
            } else {
                dispatch(viewOrdersByUserIdRequest(userId));
            }
        }
    }, [viewOrderState]);

    let COLUMNS = [];

    if (
        !viewOrderState.isFetching &&
        viewOrderState.error === "" &&
        viewOrderState.data
    ) {
        COLUMNS = formatColumns(viewOrderState.data);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (viewOrderState.isFetching) return <Loader />;

    return (
        <Box sx={{ m: 2 }}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 500 }}>
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
                            {viewOrderState.data
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
                                                        {[
                                                            "orderDate",
                                                            "serviceDate",
                                                        ].includes(column.id)
                                                            ? dateFormat(value)
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
                    count={viewOrderState.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
