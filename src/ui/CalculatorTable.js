// @flow

import type {State} from '../types.js';
import React, {Component} from 'react';

import {StringRow} from './StringRow';
import {AdjustableCell} from './AdjustableCell.js';
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
        </thead>
        <tbody>
          {this.props.strings.getStrings().map((s, index) => (
            <StringRow index={index} string={s} instrument={this.props.instrument} key={index} />
          ))}
        </tbody>
      </table>
    );
  }
}

export const CalculatorTable = connect(state => state)(CalculatorTableComponent);
