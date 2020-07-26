import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
    table: {
        width: "100%",
        borderLeftWidth: 2,
        borderLeftColor: grey[200],
        borderLeftStyle: "solid",
        borderRightWidth: 2,
        borderRightColor: grey[200],
        borderRightStyle: "solid",
    },
    head: {
        backgroundColor: grey[200],
    },
    dateCell: {
        width: 225,
    },
});

export default function InvoiceCardTable(props) {
    const { rows } = props;
    const classes = useStyles();

    return (
        <TableContainer elevation={0}>
            <Table className={classes.table} size="small">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell className={classes.dateCell}>
                                {row.startDate + "—" + row.endDate}
                            </TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.price} INR</TableCell>
                            <TableCell align="right">
                                {row.subtotal} INR
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
