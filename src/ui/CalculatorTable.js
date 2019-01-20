// @flow

import type {State} from '../types.js';
import React, {Component} from 'react';

import {StringRow} from './StringRow';
import {AdjustableCell} from './AdjustableCell.js';
import {ScalePresetsSelector} from './ScalePresetsSelector';
import {dispatch} from '../data/store';
import {connect} from 'react-redux';

type Props = State;

export class CalculatorTableComponent extends Component<Props> {
  render() {
    return (
      <table className="calculator-table">
        <thead className="thead-dark">
          <tr>
            <th>
              <AdjustableCell
                onUp={() => dispatch({type: 'increment_scale_all'})}
                onDown={() => dispatch({type: 'decrement_scale_all'})}
              >
                Scale
              </AdjustableCell>
            </th>
            <th>
              <AdjustableCell
                onUp={() => dispatch({type: 'increment_note_all'})}
                onDown={() => dispatch({type: 'decrement_note_all'})}
              >
                Note
              </AdjustableCell>
            </th>
            <th>
              <AdjustableCell
                onUp={() => dispatch({type: 'increment_gauge_all'})}
                onDown={() => dispatch({type: 'decrement_gauge_all'})}
              >
                Gauge
              </AdjustableCell>
            </th>
            <th style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>Tension</th>
            <th style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>Frequency</th>
          </tr>
          <tr>
            <th>
              <ScalePresetsSelector instrument={this.props.instrument} strings={this.props.strings} />
            </th>
            <th />
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.strings.getStrings().map((s, index) => (
            <StringRow index={index} string={s} instrument={this.props.instrument} key={index} />
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

export const CalculatorTable = connect(state => state)(CalculatorTableComponent);
