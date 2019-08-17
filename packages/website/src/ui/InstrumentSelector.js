// @flow

import type {Instrument} from '../types.js';
import React, {Component} from 'react';
import {dispatch} from '../data/store.js';

export class InstrumentSelector extends Component<{instrument: Instrument}, any> {
  render() {
    const bassChecked = this.props.instrument === 'bass';
    const guitarChecked = this.props.instrument === 'guitar';
    return (
      <div>
        <div className="instrument-selector">
          <input
            type="radio"
            className="switch-input"
            id="guitar"
            value={this.props.instrument}
            name="instrument"
            checked={guitarChecked}
            onChange={dispatch.bind(null, {type: 'select_instrument', instrument: 'guitar'})}
          />
          <label htmlFor="guitar" className="switch-label switch-label-off">
            Guitar
          </label>
          <input
            type="radio"
            className="switch-input"
            id="bass"
            value={this.props.instrument}
            name="instrument"
            checked={bassChecked}
            onChange={dispatch.bind(null, {type: 'select_instrument', instrument: 'bass'})}
          />
          <label htmlFor="bass" className="switch-label switch-label-on">
            Bass
          </label>
          <span className="switch-selection" />
        </div>
      </div>
    );
  }
}
