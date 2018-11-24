// @flow

import type {Instrument, Action, State, String} from './types';

import React, {Component} from 'react';
import './App.css';
import {getTension, getTightnessColor} from './data/tension';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {reducer} from './data/reducer.js';
import {InstrumentSelector} from './ui/InstrumentSelector.js';
import {StringRow} from './ui/StringRow.js';

const store = createStore(reducer);

class Main extends Component<State & {dispatch: Function}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">String tension calculator.</h1>
        </header>
        <div className="container">
          <div className="row justify-content-md-center">
            <InstrumentSelector instrument={this.props.instrument} dispatch={this.props.dispatch} />
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
                  <StringRowContainer index={index} string={s} key={index} />
                ))}
              </tbody>
            </table>
            <p className="mt-4">
              This tension calculator uses specifications from{' '}
              <a
                href="http://store.kaliumstrings.com/TensionCalculator/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kalium Strings
              </a>
            </p>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <a
            href="https://twitter.com/aarondjents"
            target="_blank"
            rel="noopener noreferrer"
            class="badge badge-light mt-1"
          >
            @aarondjents
          </a>
        </div>
      </div>
    );
  }
}

const StringRowContainer = connect(state => state)(StringRow);
const App = connect(state => state)(Main);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // $FlowFixMe
  document.getElementById('root'),
);
registerServiceWorker();
