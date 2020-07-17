import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export default function WorkspaceTableHead(props) {
    const {
        classes,
        onSelectAll,
        order,
        orderBy,
        selectionCount,
        rowCount,
        onRequestSort,
        headers,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            selectionCount > 0 && selectionCount < rowCount
                        }
                        checked={rowCount > 0 && selectionCount === rowCount}
                        onChange={onSelectAll}
                    />
                </TableCell>
                {headers.map((header) => (
                    <TableCell
                        key={header.id}
                        align={header.numeric ? "right" : "left"}
                        padding={header.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === header.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === header.id}
                            direction={orderBy === header.id ? order : "asc"}
                            onClick={createSortHandler(header.id)}
                        >
                            {header.label}
                            {orderBy === header.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

WorkspaceTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    selectionCount: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
