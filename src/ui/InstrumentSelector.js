// @flow

import type {Instrument} from '../types.js';
import React, {Component} from 'react';
import {dispatch} from '../data/store.js';

export class InstrumentSelector extends Component<{instrument: Instrument}, any> {
  render() {
    const baseClass = 'btn btn-lg btn-block ';
    const bassClass = baseClass + (this.props.instrument === 'bass' ? 'btn-primary' : 'btn-secondary');
    const guitarClass = baseClass + (this.props.instrument === 'guitar' ? 'btn-primary' : 'btn-secondary');
    return (
      <div style={{width: '100%'}} className="mt-3">
        <button
          type="button"
          className={guitarClass}
          onClick={dispatch.bind(null, {type: 'select_instrument', instrument: 'guitar'})}
        >
          Guitar
        </button>
        <button
          type="button"
          className={bassClass}
          onClick={dispatch.bind(null, {type: 'select_instrument', instrument: 'bass'})}
        >
          Bass
        </button>
      </div>
    );
  }
}
