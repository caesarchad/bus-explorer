import React from "react";
import BxDateTime from "./BxDateTime";
import BxStatsEntityLink from "./BxStatsEntityLink";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

class BxStatsTable extends React.Component {
    render() {
        const {globalStats} = this.props;

        let currentTpsKey = null;
        _.forEach(globalStats, (v, k) => {
            if (k && (k.indexOf("!txn-per-sec:") === 0)) {
                currentTpsKey = k;
            }
        });

        return (
            <Grid container justify="center" spacing={24} className="sideBySide">
                <Grid item>
                    {/*className={classes.gridBackColor}*/}
                    <Card >
                        <CardContent>
                            <Typography variant="h5" component="h3">
                                {/*Current Leader*/}
                                头部节点
                                {/*<BxStatsHelpLink text="Leader" term="leader"/>*/}
                            </Typography>
                            <Typography component="p">
                                <BxStatsEntityLink node={globalStats['!ent-last-leader']} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {/*Block Height*/}
                                区块高度
                                {/*<BxStatsHelpLink text="Block Height" term="block-height"/>*/}
                            </Typography>
                            <Typography component="p">
                                {globalStats['!blk-last-slot'] || "0"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {/*Current TPS/Peak TPS*/}
                                当前/峰值TPS
                                {/*<BxStatsHelpLink text="Current Transactions Per Second" term="transaction"/>*/}
                            </Typography>
                            <Typography component="p">
                                {globalStats[currentTpsKey] || "0"}/{globalStats['!txn-per-sec-max'] || "0"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {/*Total Transactions*/}
                                总交易
                                {/*<BxStatsHelpLink text="All-Time Total Transactions" term="transaction"/>*/}
                            </Typography>
                            <Typography component="p">
                                {globalStats['!txn-count'] || "0"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {/*Tick Height*/}
                                时间戳记录
                                {/*<BxStatsHelpLink text="Tick Height" term="tick-height"/>*/}
                            </Typography>
                            <Typography component="p">
                                {globalStats['!ent-height'] || "-"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card >
                        <CardContent style={{width:"160px"}}>
                            <Typography variant="h5" component="h2">
                                {/*Last Updated*/}
                                最近更新
                            </Typography>
                            <Typography component="p">
                                <BxDateTime dateTime={globalStats['!ent-last-dt']} fromNow />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
            ;
    }
}

export default BxStatsTable;
