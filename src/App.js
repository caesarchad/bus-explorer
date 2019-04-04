import React, {Component} from 'react';
import axios from 'axios';
import {Router} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider, withStyles,} from '@material-ui/core/styles';
/*import {fade} from '@material-ui/core/styles/colorManipulator';*/
import Grid from '@material-ui/core/Grid';
import RobustWebSocket from 'robust-websocket';
import _ from 'lodash';
import {matchPath} from 'react-router';
import './App.css';
import createBrowserHistory from 'history/createBrowserHistory';

import EndpointConfig from './EndpointConfig';
import BxDataTable from './BxDataTable';
import BxDataItem from './BxDataItem';
import BxTransactionChart from './BxTransactionChart';
import BxStatsGridTable from './BxStatsGridTable';
import BxDialog from './BxDialog';
import BxAppBar from './BxAppBar';

const history = createBrowserHistory();

const styles = theme => ({
  root: {
    width: '100%',
  },
    headBackGround: {
        backgroundImage: "url('/images/guide.jpg')"
    },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  link: {
    color: theme.palette.primary.light,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: '35px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: '32px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
    dataStyle: {
        position: "relative",
        margin: "auto",
        width: "100%",
        height: "100%",
        backgroundColor: '#f4f5f9',
    },
    dataTitle: {
        color: '#647273',
        paddingLeft: '10px',
    },
    dataTableCellTitle: {
        color: '#647273',
        fontSize: '0.95rem',
        padding: '4px 24px 4px 24px',
    },
    dataTableCell: {
      color: '#647273',
    },
    gridBackColor: {
        backgroundColor: '#2976c0',
    },
    sideBySideHeader: {
        width: "100%",
        flex: "0 0 50%",
        padding: '20px 0 20px 0',
        [theme.breakpoints.up('md')]: {
          flex: 'auto',
            margin: '0 5px 0 5px',
        }
    },
    statsGridIcon: {
        width: "40px",
        height: "40px",
    },
    dataListItemTitles: {
        color: '#647273',
        paddingLeft: '10px',
        display: "flex",
        textAlign: "left",
        paddingTop: "10px",
    },
    dataListItemTitle: {
        marginLeft: "10px",
        lineHeight: "30px",
    },
    dataListItemIcon: {
        width: "30px",
        height: "30px",
    },
    sideBySideHeaderSecond: {
        display: "flex",
        flexWrap: "wrap",
        width: "calc(100% + 16px)",
        margin: "-8px",
        [theme.breakpoints.up('md')]: {
            backgroundColor: '#fff',
            flexWrap: "unset",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: "4px",
            boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
        }
    },
    dataListContainer: {
        backgroundColor: '#f4f5f9',
        width: "100%",
        paddingLeft: "15px",
        paddingRight: "15px",
        boxShadow: "none",
    },
    dataListGrid: {
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: '4px',
        color: '#647273',
        [theme.breakpoints.up('md')]: {
            width: "100%",
            backgroundColor: '#fff',
            borderRadius: '4px',
            color: '#647273',
        }
    },
    dataListItemGrid: {
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: '4px',
        color: '#647273',
        marginBottom: "10px",
        boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
        [theme.breakpoints.up('md')]: {
            width: "100%",
            backgroundColor: '#fff',
            borderRadius: '4px',
            color: '#647273',
            marginBottom: "0px",
            flex: '0 0 50%',
        }
    },
    dataListItem: {
        wordBreak: 'break-word',
        border: '1px solid #DFD7CA',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderColor: '##EEEEEE',
    },
    transChart: {
      width: "calc(100% + 16px)",
        margin: "-8px",
    }
});

const BLOCK_EXPLORER_API_BASE = EndpointConfig.BLOCK_EXPLORER_API_BASE;

const BxAppBarThemed = withStyles(styles)(BxAppBar);
const BxDialogThemed = withStyles(styles)(BxDialog);
const BxTransactionChartThemed = withStyles(styles)(BxTransactionChart);
const BxDataTableThemed = withStyles(styles)(BxDataTable);
const BxDataItemThemed = withStyles(styles)(BxDataItem);
const BxStatsGridTableThemed = withStyles(styles)(BxStatsGridTable);

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#f4f5f9',
    },
  },
  typography: {useNextVariants: true},
});

class App extends Component {
  constructor(props) {
    super(props);

    this.ws = null;

    this.state = {
      enabled: true,
      dialogOpen: false,
      selectedValue: null,
      currentMatch: null,
      stateLoading: false,
      globalStats: {},
      txnStats: {},
      users: [],
      userState: {},
      transactions: [],
      blocks: [],
      entries: [],
    };

    const self = this;

    self.updateGlobalStats();
    setInterval(() => {
      self.updateGlobalStats();
    }, 1200);

    self.updateTxnStats();
    setInterval(() => {
      self.updateTxnStats();
    }, 22000);

    self.updateBlocks();

    //
    // POLLING vs. live
    //
    // setInterval(() => {
    //     self.updateBlocks();
    // }, 10000);
    //
    // self.updateEntries();
    // setInterval(() => {
    //     self.updateEntries();
    // }, 10000);

    self.updateTransactions();
    setInterval(() => {
      self.updateTransactions();
    }, 10000);
  }

  getRemoteState(attr, url, mapFun, limit) {
    axios.get(url).then(response => {
      let newState = {};

      if (limit) {
        response.data = response.data.slice(0, limit);
      }

      if (mapFun) {
        newState[attr] = _.map(response.data, mapFun);
      } else {
        newState[attr] = response.data;
      }

      this.updateStateAttributes(newState);
    });
  }

  updateSpecificGlobalStateAttribute(attr, value) {
    let globalStats = {...this.state.globalStats};
    globalStats[attr] = value;

    this.updateStateAttributes({globalStats: globalStats});
  }

  updateStateAttributes(attrMap) {
    let newState = {...this.state};

    _.forEach(attrMap, (v, k) => {
      newState[k] = v;
    });

    this.setState(() => {
      return newState;
    });
  }

  updateGlobalStats() {
    this.getRemoteState(
      'globalStats',
      `http:${BLOCK_EXPLORER_API_BASE}/global-stats`,
    );
  }

  updateTxnStats() {
    this.getRemoteState(
      'txnStats',
      `http:${BLOCK_EXPLORER_API_BASE}/txn-stats`,
    );
  }

  updateBlocks() {
    if (!this.state.enabled) {
      return;
    }

    let blkFun = v => {
      let newObj = {};
      let fields = v.split('#');

      newObj.t = 'blk';
      newObj.h = fields[0];
      newObj.l = fields[1];
      newObj.s = fields[2];
      newObj.dt = fields[3];
      newObj.id = fields[4];

      return newObj;
    };

    this.getRemoteState(
      'blocks',
      `http:${BLOCK_EXPLORER_API_BASE}/blk-timeline`,
      blkFun,
      10,
    );
  }

  updateEntries() {
    if (!this.state.enabled) {
      return;
    }

    let entFun = v => {
      let newObj = {};
      let fields = v.split('#');

      newObj.t = 'ent';
      newObj.h = fields[0];
      newObj.l = fields[1];
      newObj.s = fields[2];
      newObj.dt = fields[3];
      newObj.id = fields[4];
      newObj.txn_count = parseInt(fields[5] || '0');

      return newObj;
    };

    this.getRemoteState(
      'entries',
      `http:${BLOCK_EXPLORER_API_BASE}/ent-timeline`,
      entFun,
      10,
    );
  }

  updateTransactions() {
    if (!this.state.enabled) {
      return;
    }

    let txnFun = v => {
      let newObj = {};
      let fields = v.split('#');

      newObj.t = 'txn';
      newObj.h = fields[0];
      newObj.l = fields[1];
      newObj.s = fields[2];
      newObj.dt = fields[3];
      newObj.entry_id = fields[4];
      newObj.id = fields[5];

      return newObj;
    };

    this.getRemoteState(
      'transactions',
      `http:${BLOCK_EXPLORER_API_BASE}/txn-timeline`,
      txnFun,
      10,
    );
  }

  handleLocationChange = () => location => {
    if (location.pathname === '/' && this.selectedValue !== null) {
      this.updateStateAttributes({
        selectedValue: null,
        dialogOpen: false,
        currentMatch: null,
        stateLoading: false,
      });
    }

    if (location.pathname !== '/') {
      let pathMatch = matchPath(window.location.pathname, {
        path: '/:type/:id',
        exact: false,
        strict: false,
      });

      if (pathMatch) {
        this.handleClickOpen(pathMatch.params.id, pathMatch.params.type)();
        this.updateStateAttributes({
          currentMatch: pathMatch,
          stateLoading: true,
        });
      }
    }
  };

  componentDidMount() {
    const self = this;

    let ws = new RobustWebSocket(`wss:${BLOCK_EXPLORER_API_BASE}/`);

    ws.addEventListener('open', function() {
      ws.send('<client_hello>');
    });

    ws.addEventListener('message', function(event) {
      if (!self.state.enabled) {
        return;
      }

      self.onMessage(JSON.parse(event.data));
    });

    this.ws = ws;

    let locationListener = this.handleLocationChange();
    history.listen(locationListener);
    locationListener(window.location);
  }

  componentWillUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  }

  onMessage = data => {
    if (!this.state.enabled) {
      return;
    }

    let type = data.t;
    let message = data.m;
    let fields = message.split('#');

    if (type === 'blk') {
      let block = {
        t: 'blk',
        h: parseInt(fields[0]),
        l: fields[1],
        s: parseInt(fields[2]),
        dt: fields[3],
        id: fields[4],
      };

      this.addBlock(block);
    }

    if (type === 'ent') {
      let entry = {
        t: 'ent',
        h: parseInt(fields[0]),
        l: fields[1],
        s: parseInt(fields[2]),
        dt: fields[3],
        id: fields[4],
        txn_count: parseInt(fields[5]),
      };

      this.addEntry(entry);
    }
  };

  addEntry(entry) {
    let entries = [...this.state.entries];

    if (entries.length >= 10) {
      entries.pop();
    }

    entries.unshift(entry);

    this.updateStateAttributes({entries: entries});

    if (entry.h > this.state.globalStats['!ent-height']) {
      this.updateSpecificGlobalStateAttribute('!ent-height', entry.h);
    }

    if (entry.dt > this.state.globalStats['!ent-last-dt']) {
      this.updateSpecificGlobalStateAttribute('!ent-last-dt', entry.dt);
    }
  }

  addBlock(block) {
    let blocks = [...this.state.blocks];

    if (blocks.length >= 10) {
      blocks.pop();
    }

    blocks.unshift(block);

    this.updateStateAttributes({blocks: blocks});

    if (block.s > this.state.globalStats['!blk-slot']) {
      this.updateSpecificGlobalStateAttribute('!blk-slot', block.s);
    }
  }

  handleDialogClose = () => {
    this.updateStateAttributes({
      selectedValue: null,
      dialogOpen: false,
      currentMatch: null,
      stateLoading: false,
    });
    history.push('/');
  };

  toggleEnabled = self => event => {
    if (event.target.checked === self.state.enabled) {
      return;
    }

    this.updateStateAttributes({
      enabled: event.target.checked,
    });
  };

  handleSearch = () => event => {
    let value = event.target.value;
    event.target.value = '';

    if (value.length > 80) {
      history.push(`/txn/${value}`);
      return;
    }

    history.push(`/ent/${value}`);
    return;
  };

  handleClickOpen = (value, type) => () => {
    let mkUrl = (id, type) => {
      let url = null;

      if (type === 'txn') {
        url = `${BLOCK_EXPLORER_API_BASE}/txn/${id}`;
      }

      if (type === 'ent') {
        url = `${BLOCK_EXPLORER_API_BASE}/ent/${id}`;
      }

      if (type === 'blk') {
        url = `${BLOCK_EXPLORER_API_BASE}/blk/${id}`;
      }

      return url;
    };

    let url = mkUrl(value, type);

    const self = this;

    let updateState = newVal => {
      self.updateStateAttributes({
        selectedValue: newVal,
        dialogOpen: true,
        stateLoading: false,
      });
    };

    axios
      .get(url)
      .then(response => {
        updateState(response.data);
      })
      .catch(() => {
        history.goBack();
      });
  };

  render() {
    const self = this;

    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <div className="App">
            <BxAppBarThemed
              handleSearch={self.handleSearch(self)}
              enabled={this.state.enabled}
              handleSwitch={this.toggleEnabled(self)}
            />
            <div>
              <BxDialogThemed selectedValue={this.state.selectedValue} open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
            </div>
            <div style={{marginLeft:'20px',marginRight:'20px'}}>
              <p />
              <BxStatsGridTableThemed globalStats={this.state.globalStats} />
              <p />
              <BxTransactionChartThemed txnStats={this.state.txnStats} />
              <p/>
              <Grid container spacing={16} justify="center">
                    <BxDataItemThemed dataType="ent" dataItems={this.state.entries}/>
                    <BxDataItemThemed dataType="blk" dataItems={this.state.blocks}/>
              </Grid>
              <p />
              <Grid container spacing={16} justify="center">
                  <BxDataTableThemed dataType="txn" dataItems={this.state.transactions}/>
              </Grid>
              <p />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
