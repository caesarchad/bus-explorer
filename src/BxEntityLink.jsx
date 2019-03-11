import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import BxDetail from "./BxDetail";

class BxEntityLink extends React.Component {
    renderNode() {
        return (
            <code title={this.props.node} style={{color: '#647273'}}>{this.props.node.substring(0, 22) + "\u2026"}</code>
        );
    }

    renderBlock() {
        return (
            <Link component={RouterLink} to={"/blk/" + this.props.blk}>
                <code title={this.props.blk} style={{color: '#647273'}}>{this.props.blk}</code>
            </Link>
        );
    }

    renderEntry() {
        return (
            <Link component={RouterLink} to={"/ent/" + this.props.ent}>
                <code title={this.props.ent} style={{color: '#647273'}}>{this.props.ent}</code>
            </Link>
        );
    }

    renderTransaction() {
        return (
            <Link component={RouterLink} to={"/txn/" + this.props.txn}>
                <code title={this.props.txn} style={{color: '#647273'}}>{this.props.txn}</code>
            </Link>
        );
    }

    render() {
        const {node, ent, blk, txn} = this.props;

        if (node) {
            return this.renderNode();
        }

        if (ent) {
            return this.renderEntry();
        }

        if (blk) {
            return this.renderBlock();
        }

        if (txn) {
            return this.renderTransaction();
        }

        return (
            <span>unknown entity</span>
        );
    }
}

export default BxEntityLink;
