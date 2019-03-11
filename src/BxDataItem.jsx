import React from 'react';
import PropTypes from 'prop-types';
import BxDateTime from './BxDateTime';
import BxEntityLink from './BxEntityLink';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

class BxDataItem extends React.Component {
    renderBlocks() {
        const {classes, dataItems} = this.props;
        return (
            <Paper className={classes.dataListContainer}>
                <Grid className={classes.dataListGrid}>
                    <Typography variant="h6" id="tableTitle" className={classes.dataTitle} style={{textAlign: 'left',paddingTop: '10px'}}>
                        {/*Latest Blocks*/}
                        最新区块
                        {/*<BxHelpLink text="Block" term="block"/>*/}
                    </Typography>
                    <List>
                        {_.map(dataItems, row => (
                            <ListItem key={row.id} className={classes.dataListItem}>
                                <ListItemText>
                                    <Typography className={classes.dataTableCell}>
                                        区块ID：<BxEntityLink blk={row.id} />
                                    </Typography>
                                    <Typography className={classes.dataTableCell}>
                                        区块高度：{row.s}
                                    </Typography>
                                    <Typography className={classes.dataTableCell}>
                                    生成时间：{BxDateTime.formatDateTime(row.dt, {style:BxDateTime.ISO8601_FMT, local:true})}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            ))
                        }
                    </List>
                </Grid>
            </Paper>
        );
    }

    renderEntries() {
        const {classes, dataItems} = this.props;
        return (
            <Paper className={classes.dataListContainer}>
                <Grid className={classes.dataListGrid}>
                    <Typography variant="h6" id="tableTitle" className={classes.dataTitle} style={{textAlign: 'left',paddingTop: '10px'}}>
                        {/*Latest Entries*/}
                        最新记录
                        {/*<BxHelpLink text="Entry" term="entry"/>*/}
                    </Typography>
                    <List>
                        {_.map(dataItems, row => (
                            <ListItem key={row.id} className={classes.dataListItem}>
                                <ListItemText>
                                    <Typography className={classes.dataTableCell}>
                                    记录ID：<BxEntityLink ent={row.id} />
                                    </Typography>
                                    <Grid style={{display: "flex"}}>
                                        <Typography className={classes.dataTableCell} style={{width: "180px"}}>
                                        区块高度：{row.s}
                                        </Typography>
                                        <Typography className={classes.dataTableCell} style={{marginLeft: "20px"}}>
                                        时间戳记录数：{row.h}
                                        </Typography>
                                    </Grid>
                                    <Grid style={{display: "flex"}}>
                                        <Typography className={classes.dataTableCell} style={{width: "180px"}}>
                                        交易数量：{row.txn_count}
                                        </Typography>
                                        <Typography className={classes.dataTableCell} style={{marginLeft: "20px"}}>
                                        发起时间：{BxDateTime.formatDateTime(row.dt, {style:BxDateTime.ISO8601_FMT, local:true})}
                                        </Typography>
                                    </Grid>
                                </ListItemText>
                            </ListItem>
                        ))
                        }
                    </List>
                </Grid>
            </Paper>
        );
    }

    renderTransactions() {
        const {classes, dataItems} = this.props;
        return (
            <Paper>
                <Typography variant="h6" id="tableTitle" className={classes.dataTitle} style={{textAlign: 'left',paddingTop: '10px'}}>
                    {/*Sample Transactions (updated every 10s)*/}
                    最新交易(每10s更新)
                    {/*<BxHelpLink text="Transaction" term="transaction" />*/}
                </Typography>
                <List>
                    {_.map(dataItems, row => (
                        <ListItem key={row.id}>
                            <ListItemText>
                                区块高度：{row.s}
                                交易ID：<BxEntityLink txn={row.id} />
                                发起时间：{BxDateTime.formatDateTime(row.dt, {style:BxDateTime.ISO8601_FMT_SS, local:true})}
                            </ListItemText>
                        </ListItem>
                    ))
                    }
                </List>
            </Paper>
        );
    }

    render() {
        const {dataType} = this.props;

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

BxDataItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default BxDataItem;
