// @flow

import type {StringsState} from '../data/StringsState.js';
import React, {Component} from 'react';

import {StringRow} from './StringRow';
import {AdjustButtons} from './AdjustButtons.js';
import {dispatch} from '../data/store';

type Props = {|
  strings: StringsState,
|};

export class CalculatorTable extends Component<Props> {
  render() {
    return (
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>
              Scale
              <AdjustButtons
                onUp={() => dispatch({type: 'increment_scale_all'})}
                onDown={() => dispatch({type: 'decrement_scale_all'})}
              />
            </th>
            <th>
              Note
              <AdjustButtons
                onUp={() => dispatch({type: 'increment_note_all'})}
                onDown={() => dispatch({type: 'decrement_note_all'})}
              />
            </th>
            <th>
              Gauge
              <AdjustButtons
                onUp={() => dispatch({type: 'increment_gauge_all'})}
                onDown={() => dispatch({type: 'decrement_gauge_all'})}
              />
            </th>
            <th>Tension</th>
            <th>Frequency</th>
          </tr>
          <tr>
            <th />
            <th />
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.strings.getStrings().map((s, index) => (
            <StringRow index={index} string={s} key={index} />
          ))}
          <tr>
            <td colSpan="5">
              <button className="btn btn-primary" onClick={() => dispatch({type: 'add_string'})}>
                Add string
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
