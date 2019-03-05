// @flow

import type {State} from './types';

import './App.css';
import {CalculatorTable} from './ui/CalculatorTable.js';
import {connect, Provider} from 'react-redux';
import {dispatch} from './data/store.js';
import {InstrumentSelector} from './ui/InstrumentSelector.js';
import {ScalePresetsSelector} from './ui/ScalePresetsSelector.js';
import {store} from './data/store.js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

class Main extends Component<State & {dispatch: Function}> {
  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="header-logo">
            <img src="/logo_header.png" alt="logo" />
            <h1>
              <span>String Tension</span>
              <span>Calculator</span>
            </h1>
          </div>
          <InstrumentSelector instrument={this.props.instrument} />
        </div>
        <ScalePresetsSelector instrument={this.props.instrument} strings={this.props.strings} />
        <CalculatorTable strings={this.props.strings} />
        <button className="add-string-button" onClick={() => dispatch({type: 'add_string'})}>
          ＋ Add string
        </button>
        <div className="footer">
          <p>
            <span>This tension calculator uses</span>
            <span>
              specifications from{' '}
              <a href="https://www.kaliummusic.com" target="_blank" rel="noopener noreferrer">
                Kalium Strings
              </a>
            </span>
          </p>
          <a href="https://twitter.com/aarondjents" target="_blank" rel="noopener noreferrer" className="twitter-link">
            <img src="/twitter.png" alt="twitter" />
          </a>
        </div>
      </div>
    );
  }
}

const App = connect(state => state)(Main);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // $FlowFixMe
  document.getElementById('root'),
);
registerServiceWorker();
