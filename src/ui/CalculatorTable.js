// @flow

import type {StringsState} from '../data/StringsState.js';
import React, {Component} from 'react';

import {StringRow} from './StringRow';

type Props = {|
  strings: StringsState,
|};

export class CalculatorTable extends Component<Props> {
  render() {
    return (
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Scale</th>
            <th>Note</th>
            <th>Gauge</th>
            <th>Tension</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {this.props.strings.getStrings().map((s, index) => (
            <StringRow index={index} string={s} key={index} />
          ))}
        </tbody>
      </table>
    );
  }
}
