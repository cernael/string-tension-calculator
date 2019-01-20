// @flow

import type {Node} from 'react';

import React, {Component} from 'react';

export class AdjustableCell extends Component<{onUp: () => void, onDown: () => void, children: Node}> {
  render() {
    return (
      <div className="adjustable-cell">
        <a className="adjustable-cell-up" onClick={this.props.onUp}>
          <span className="adjustable-cell-arrow-up" />
        </a>
        {this.props.children}
        <a className="adjustable-cell-down" onClick={this.props.onDown}>
          <span className="adjustable-cell-arrow-down" />
        </a>
      </div>
    );
  }
}
