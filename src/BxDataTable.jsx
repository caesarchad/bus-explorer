import React from 'react';
import PropTypes from 'prop-types';
import BxDateTime from './BxDateTime';
import BxEntityLink from './BxEntityLink';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

class BxDataTable extends React.Component {
    renderBlocks() {
        const {classes, dataItems} = this.props;
        return (
            <Paper>
                <Typography variant="h6" id="tableTitle" className={classes.dataTitle} style={{textAlign: 'left'}}>
                    {/*Latest Blocks*/}
                    最新区块
                    {/*<BxHelpLink text="Block" term="block"/>*/}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.dataTableCellTitle}>
                                {/*Block Height*/}
                                区块高度
                                {/*<BxHelpLink text="Block Height" term="block-height"/>*/}
                            </TableCell>
                            <TableCell align="left" className={classes.dataTableCellTitle}>
                                {/*Block ID*/}
                                区块ID
                                {/*<BxHelpLink text="Block ID" term="block"/>*/}
                            </TableCell>
                            <TableCell align="left" className={classes.dataTableCellTitle}>
                                {/*Timestamp (approx)*/}
                                生成时间
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.size(dataItems)===0?(
                            <TableRow>
                            <TableCell colSpan={3} className={classes.dataTableCellTitle} style={{textAlign: 'center'}}>
                                No Data
                            </TableCell>
                            </TableRow>):(
                            _.map(dataItems, row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" className={classes.dataTableCell}>
                                        {row.s}
                                    </TableCell>
                                    <TableCell className={classes.dataTableCell}>
                                        <BxEntityLink blk={row.id} />
                                    </TableCell>
                                    <TableCell className={classes.dataTableCell}>
                                        {/*<BxDateTime dateTime={row.dt} local />*/}
                                        {BxDateTime.formatDateTime(row.dt, {style:BxDateTime.ISO8601_FMT, local:true})}
                                    </TableCell>
                                </TableRow>
                            )))
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    renderEntries() {
        const {classes, dataItems} = this.props;
        return (
            <Paper>
                <Typography variant="h6" id="tableTitle" className={classes.dataTitle} style={{textAlign: 'left'}}>
                    {/*Latest Entries*/}
                    最新记录
                    {/*<BxHelpLink text="Entry" term="entry"/>*/}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.dataTableCellTitle}>
                                {/*Entry ID*/}
                                记录ID
                                {/*<BxHelpLink text="Entry ID" term="entry" />*/}
                            </TableCell>
                            <TableCell className={classes.dataTableCellTitle}>
                                {/*Block Height*/}
                                区块高度
                                {/*<BxHelpLink text="Block Height" term="block-height" />*/}
                            </TableCell>
                            <TableCell className={classes.dataTableCellTitle}>
                                {/*Tick Height*/}
                                时间戳记录数
                                {/*<BxHelpLink text="Tick Height" term="tick-height" />*/}
                            </TableCell>
                            <TableCell className={classes.dataTableCellTitle}>
                                {/*Transaction Count*/}
                                交易数量
                                {/*<BxHelpLink text="Transaction" term="transaction" />*/}
                            </TableCell>
                            <TableCell className={classes.dataTableCellTitle}>
                                {/*Timestamp (approx)*/}
                                发起时间
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.size(dataItems) === 0?
                            (<TableRow>
                                <TableCell colSpan={5} className={classes.dataTableCellTitle} style={{textAlign: 'center'}}>
                                    No Data
                                </TableCell>
                            </TableRow>):
                            (_.map(dataItems, row => (
                            <TableRow key={row.id}>
                            <TableCell component="th" scope="row" className={classes.dataTableCell}>
                            <BxEntityLink ent={row.id} />
                            </TableCell>
                            <TableCell className={classes.dataTableCell}>{row.s}</TableCell>
                            <TableCell className={classes.dataTableCell}>{row.h}</TableCell>
                            <TableCell className={classes.dataTableCell}>{row.txn_count}</TableCell>
                            <TableCell className={classes.dataTableCell}>
                                {/*<BxDateTime dateTime={row.dt} local />*/}
                                {BxDateTime.formatDateTime(row.dt, {style:BxDateTime.ISO8601_FMT, local:true})}
                            </TableCell>
                            </TableRow>
                            )))
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    renderTransactions() {
        const {classes, dataItems} = this.props;
        return (
            <Paper>
                <Typography variant="h6" id="tableTitle" className={classes.dataTitle} style={{textAlign: 'left'}}>
                    {/*Sample Transactions (updated every 10s)*/}
                    最新交易(每10s更新)
                    {/*<BxHelpLink text="Transaction" term="transaction" />*/}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className={classes.dataTableCellTitle}>
                                {/*Transaction ID*/}
                                交易ID
                                {/*<BxHelpLink text="Transaction" term="transaction" />*/}
                            </TableCell>
                            <TableCell align="left" className={classes.dataTableCellTitle}>
                                {/*Block Height*/}
                                区块高度
                                {/*<BxHelpLink text="Block Height" term="block-height" />*/}
                            </TableCell>
                            <TableCell align="left" className={classes.dataTableCellTitle}>
                                {/*Timestamp (approx)*/}
                                发起时间
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.size(dataItems) === 0 ?
                            (<TableRow>
                                <TableCell colSpan={3} className={classes.dataTableCellTitle} style={{textAlign: 'center'}}>
                                    No Data
                                </TableCell>
                            </TableRow>):
                            (_.map(dataItems, row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" className={classes.dataTableCell}>
                                        <BxEntityLink txn={row.id} />
                                    </TableCell>
                                    <TableCell className={classes.dataTableCell}>{row.s}</TableCell>
                                    <TableCell className={classes.dataTableCell}>
                                        {/*<BxDateTime dateTime={row.dt} local />*/}
                                        {BxDateTime.formatDateTime(row.dt, {style:BxDateTime.ISO8601_FMT_SS, local:true})}
                                    </TableCell>
                                </TableRow>
                            )))
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    render() {
        const {classes, dataType} = this.props;

        if (dataType === 'blk') {
            return this.renderBlocks();
        }

        if (dataType === 'ent') {
            return this.renderEntries();
        }

        if (dataType === 'txn') {
            return this.renderTransactions();
        }

        return (
            <Paper>
                <Typography variant="h6" id="tableTitle" style={{textAlign: 'left'}}>
                    (ERROR - No data.)
                </Typography>
            </Paper>
        );
    }
}

BxDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default BxDataTable;
