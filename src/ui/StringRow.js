// @flow

import type {String, Instrument} from '../types.js';

import {AdjustButtons} from './AdjustButtons.js';
import {DataBadge} from './DataBadge.js';
import {getTension, getTightnessColor} from '../data/tension.js';
import {roundTo} from '../data/utils.js';
import React, {Component} from 'react';
import {dispatch} from '../data/store.js';

type StringRowProps = {|
  string: String,
  index: number,
  instrument: Instrument,
|};

export class StringRow extends Component<StringRowProps> {
  render() {
    const scientific = this.props.string.note.scientific();
    const scale = this.props.string.scale;
    const freq = this.props.string.note.freq();
    const unitWeight = this.props.string.physicalString.unitWeight;
    const tension = getTension({
      scale,
      freq,
      unitWeight,
    });
    return (
      <tr>
        <td>
          <DataBadge value={this.props.string.scale} />
          <AdjustButtons
            onUp={dispatch.bind(null, {
              type: 'increment_scale_at_index',
              index: this.props.index,
            })}
            onDown={dispatch.bind(null, {
              type: 'decrement_scale_at_index',
              index: this.props.index,
            })}
          />
        </td>
        <td>
          {scientific}
          <AdjustButtons
            onUp={dispatch.bind(null, {
              type: 'increment_note_at_index',
              index: this.props.index,
            })}
            onDown={dispatch.bind(null, {
              type: 'decrement_note_at_index',
              index: this.props.index,
            })}
          />
        </td>

        <td>
          {this.props.string.physicalString.gauge}
          <AdjustButtons
            onUp={dispatch.bind(null, {
              type: 'increment_gauge_at_index',
              index: this.props.index,
            })}
            onDown={dispatch.bind(null, {
              type: 'decrement_gauge_at_index',
              index: this.props.index,
            })}
          />
        </td>

        <td style={{backgroundColor: getTightnessColor({tension, instrument: this.props.instrument})}}>
          {roundTo(tension, 3)} lbs
        </td>
        <td>{roundTo(this.props.string.note.freq(), 3)}</td>
      </tr>
    );
  }
}
