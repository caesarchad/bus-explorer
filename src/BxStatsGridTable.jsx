import React from "react";
import BxDateTime from "./BxDateTime";
import BxStatsEntityLink from "./BxStatsEntityLink";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

class BxStatsTable extends React.Component {
    render() {
        const {classes, globalStats} = this.props;

        let currentTpsKey = null;
        _.forEach(globalStats, (v, k) => {
            if (k && (k.indexOf("!txn-per-sec:") === 0)) {
                currentTpsKey = k;
            }
        });

        return (
            <Grid className={classes.sideBySideHeaderSecond}>
                <Grid>
                    <Typography variant="h5" component="h3" className="headerTypography">
                        {/*Current Leader*/}
                        头部节点
                        {/*<BxStatsHelpLink text="Leader" term="leader"/>*/}
                        <Typography component="p">
                            <BxStatsEntityLink node={globalStats['!ent-last-leader']} />
                        </Typography>
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="h5" component="h2" className="headerTypography">
                        {/*Block Height*/}
                        区块高度
                        {/*<BxStatsHelpLink text="Block Height" term="block-height"/>*/}
                        <Typography component="p">
                            {globalStats['!blk-last-slot'] || "0"}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="h5" component="h2" className="headerTypography">
                        {/*Current TPS/Peak TPS*/}
                        当前/峰值TPS
                        {/*<BxStatsHelpLink text="Current Transactions Per Second" term="transaction"/>*/}
                        <Typography component="p">
                            {globalStats[currentTpsKey] || "0"}/{globalStats['!txn-per-sec-max'] || "0"}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="h5" component="h2" className="headerTypography">
                        {/*Total Transactions*/}
                        总交易
                        {/*<BxStatsHelpLink text="All-Time Total Transactions" term="transaction"/>*/}
                        <Typography component="p">
                            {globalStats['!txn-count'] || "0"}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="h5" component="h2" className="headerTypography">
                        {/*Tick Height*/}
                        时间戳记录
                        {/*<BxStatsHelpLink text="Tick Height" term="tick-height"/>*/}
                        <Typography component="p">
                            {globalStats['!ent-height'] || "-"}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="h5" component="h2" className="headerTypography">
                        {/*Last Updated*/}
                        最近更新
                        <Typography component="p">
                            <BxDateTime dateTime={globalStats['!ent-last-dt']} fromNow />
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>

        )
            ;
    }
}

export default BxStatsTable;
