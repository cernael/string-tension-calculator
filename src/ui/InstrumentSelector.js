// @flow

import type {Instrument} from '../types.js';
import React, {Component} from 'react';

export class InstrumentSelector extends Component<{instrument: Instrument, dispatch: Function}, any> {
  render() {
    const baseClass = 'btn btn-lg btn-block ';
    const bassClass = baseClass + (this.props.instrument === 'bass' ? 'btn-primary' : 'btn-secondary');
    const guitarClass = baseClass + (this.props.instrument === 'guitar' ? 'btn-primary' : 'btn-secondary');
    return (
      <div style={{width: '100%'}} className="mt-3">
        <button
          type="button"
          className={guitarClass}
          onClick={this.props.dispatch.bind(null, {type: 'select_instrument', instrument: 'guitar'})}
        >
          Guitar
        </button>
        <button
          type="button"
          className={bassClass}
          onClick={this.props.dispatch.bind(null, {type: 'select_instrument', instrument: 'bass'})}
        >
          Bass
        </button>
      </div>
    );
  }
}
