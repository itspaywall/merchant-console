import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";

import WorkspaceTableHead from "./WorkspaceTableHead";

/* The default comparator is recommended if the column IDs and the values are primitive.
 * Otherwise you should provide a custom descending comparator.
 */
function defaultDescendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(descendingComparator, order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const auxillary = array.map((value, index) => [value, index]);
    auxillary.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return auxillary.map((value) => value[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

export default function WorkspaceTable(props) {
    const classes = useStyles();
    const {
        onSelected,
        headers,
        selected,
        compact,
        onClick,
        renderCellValue,
        rows,
        totalRows,
        page,
        onChangePage,
        rowsPerPage,
        onChangeRowsPerPage,
        descendingComparator,
    } = props;
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");

    const handleRequestSort = (event, property) => {
        const ascending = orderBy === property && order === "asc";
        setOrder(ascending ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelection = rows.map((row) => row.id);
            onSelected(newSelection);
        } else {
            onSelected([]);
        }
    };

    // const makeHandleSelect = (name) => (event) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1)
    //         );
    //     }

    //     onSelected(newSelected);
    // };

    const emptyRows = rowsPerPage - rows.length;

    const makeHandleCellClick = (row, column) => () => {
        if (column.clickable) {
            onClick(row);
        }
    };

    const renderCells = (row, rowIndex) => (
        <React.Fragment>
            {headers.map((column, columnIndex) => (
                <TableCell onClick={makeHandleCellClick(row, column)}>
                    {renderCellValue(row, rowIndex, column, columnIndex)}
                </TableCell>
            ))}
        </React.Fragment>
    );

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        size={compact ? "small" : "medium"}
                    >
                        <WorkspaceTableHead
                            classes={classes}
                            selectionCount={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAll={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headers={headers}
                        />
                        <TableBody>
                            {stableSort(
                                rows,
                                getComparator(
                                    descendingComparator ||
                                        defaultDescendingComparator,
                                    order,
                                    orderBy
                                )
                            ).map((row, index) => {
                                const isItemSelected =
                                    selected.indexOf(row.id) >= 0;

                                return (
                                    <TableRow
                                        hover={true}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.identifier}
                                        selected={isItemSelected}
                                    >
                                        {/*<TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onChange={makeHandleSelect(
                                                        row.identifier
                                                    )}
                                                />
                                            </TableCell>*/}

                                        {renderCells(row, index)}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (compact ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 40, 60, 80, 100]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={(event, newPage) => onChangePage(newPage)}
                    onChangeRowsPerPage={(event) =>
                        onChangeRowsPerPage(parseInt(event.target.value, 10))
                    }
                />
            </Paper>
        </div>
    );
}
