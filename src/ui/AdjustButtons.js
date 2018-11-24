// @flow

import React, {Component} from 'react';

export class AdjustButtons extends Component<{onUp: () => void, onDown: () => void}> {
  render() {
    return (
      <div className="btn-group-vertical ml-5">
        {' '}
        <button type="button" className="btn btn-secondary" onClick={this.props.onUp}>
          ^
        </button>
        <button type="button" className="btn btn-secondary" onClick={this.props.onDown}>
          v
        </button>
      </div>
    );
  }
}
