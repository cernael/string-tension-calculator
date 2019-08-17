// @flow

import type {State} from './types';

import {CalculatorTable} from './ui/CalculatorTable.js';
import {connect, Provider} from 'react-redux';
import {dispatch} from './data/store.js';
import {InstrumentSelector} from './ui/InstrumentSelector.js';
import {ScalePresetsSelector} from './ui/ScalePresetsSelector.js';
import {store} from './data/store.js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Calculator extends Component<State & {dispatch: Function}> {
  render() {
    console.log(this.props);

    // $FlowFixMe
    let Header = this.props.children || null;

    return (
      <div className="App">
        <div className="header">
          {Header}
          <InstrumentSelector instrument={this.props.instrument} />
        </div>
        <ScalePresetsSelector instrument={this.props.instrument} strings={this.props.strings} />
        <CalculatorTable strings={this.props.strings} />
        <button className="add-string-button" onClick={() => dispatch({type: 'add_string'})}>
          ＋ Add string
        </button>
      </div>
    );
  }
}

const App = connect(state => state)(Calculator);

export default class ExportedCalculator extends Component<any> {
  render() {
    return (
      <Provider store={store}>
        <App>{this.props.children}</App>
      </Provider>
    );
  }
}
