// @flow

import type {State} from './types';

import {CalculatorTable} from './ui/CalculatorTable.js';
import {connect, Provider} from 'react-redux';
import {InstrumentSelector} from './ui/InstrumentSelector.js';
import {ScalePresetsSelector} from './ui/ScalePresetsSelector.js';
import {store, dispatch} from './data/store.js';
import * as React from 'react';
import ReactDOM from 'react-dom';

class Calculator extends React.Component<State & {dispatch: Function, children?: React.Node}> {
  render() {
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

type ExportedCalculatorProps = {
  enableLogging: boolean,
  children?: React.Node,
};

export default class ExportedCalculator extends React.Component<ExportedCalculatorProps> {
  componentDidMount() {
    dispatch({type: 'set_logging_enabled', enabled: this.props.enableLogging});
  }

  render() {
    return (
      <Provider store={store}>
        <App enableLogging={this.props.enableLogging}>{this.props.children}</App>
      </Provider>
    );
  }
}
