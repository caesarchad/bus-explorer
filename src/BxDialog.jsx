import React from "react";
import BxDateTime from "./BxDateTime";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const location = window.location.href;

class BxDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    render() {
        const {classes, onClose, selectedValue, ...other} = this.props;

        let value = selectedValue || {};
        let title = null;
        let url = location;
        let rows = [];
        if (value.t !== "blk") {
            rows.push(["区块ID", value.block_id || (value.block && value.block.id) || "<pending>"]);
        }

        rows.push(["运算周期", value.s]);
        rows.push(["时间戳记录数", value.h]);
        let dates = BxDateTime.formatDateTime(value.dt, {style:BxDateTime.ISO8601_FMT, local:true});
        rows.push(["记录时间", dates, value.dt]);

        if (value.t === "txn") {
            title = "交易";
            url = url + "txn/" + value.id;
            // rows.push(["Signature(s)", value.instructions[0].signatures.join(", ")]);
            // rows.push(["Program ID(s)", value.instructions[0].program_id]);
            // rows.push(["Account(s)", value.instructions[0].keys.join(", ")]);
        }

        if (value.t === "blk") {
            title = "区块";
            url = url + "blk/" + value.id;
            rows.push(["区块交易", value.entries.join(", ")]);
        }

        if (value.t === "ent") {
            title = "记录";
            url = url + "ent/" + value.id;
            rows.push(["交易信息", value.transactions.join(", ")]);
        }

        rows.unshift([title + " ID", value.id]);

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" fullWidth={true} maxWidth={"lg"} {...other}>
                <DialogTitle id="simple-dialog-title" title={JSON.stringify(value)}>
                    {title} 明细
                    <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Paper>
                    <Table>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={JSON.stringify(row)}>
                                    <TableCell component="th" scope="row">{row[0]}:</TableCell>
                                    <TableCell align="left" title={row[2]}>{row[1]}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow style={{backgroundColor: "#f8f8f8"}}>
                                <TableCell component="th" scope="row" style={{minWidth: "130px"}}>当前浏览代码:</TableCell>
                                <TableCell align="left" title={url} style={{maxWidth: "800px",wordWrap:"break-word"}}>
                                    <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(value, '\\', 4)}</pre>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Dialog>
        );
    }
}

BxDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.object,
};

export default BxDialog;