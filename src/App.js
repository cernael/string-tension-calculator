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

const roundTo = (number, digits) => {
  return Math.floor(number * Math.pow(10, digits)) / Math.pow(10, digits);
};

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

type StringRowProps = State & {
  string: String,
  index: number,
  dispatch: Action => void,
};

class StringRow extends Component<StringRowProps> {
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
            onUp={this.props.dispatch.bind(null, {
              type: 'increment_scale_at_index',
              index: this.props.index,
            })}
            onDown={this.props.dispatch.bind(null, {
              type: 'decrement_scale_at_index',
              index: this.props.index,
            })}
          />
        </td>
        <td>
          {scientific}
          <AdjustButtons
            onUp={this.props.dispatch.bind(null, {
              type: 'increment_note_at_index',
              index: this.props.index,
            })}
            onDown={this.props.dispatch.bind(null, {
              type: 'decrement_note_at_index',
              index: this.props.index,
            })}
          />
        </td>

        <td>
          {this.props.string.physicalString.gauge}
          <AdjustButtons
            onUp={this.props.dispatch.bind(null, {
              type: 'increment_gauge_at_index',
              index: this.props.index,
            })}
            onDown={this.props.dispatch.bind(null, {
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

class AdjustButtons extends Component<{onUp: () => void, onDown: () => void}> {
  render() {
    return (
      <div className="btn-group-vertical ml-5">
        {' '}
        <button type="button" className="btn btn-secondary" onClick={this.props.onUp}>
          ^
        </button>
        <button type="button" className="btn btn-secondary" onClick={this.props.onDown}>
          v
        </button>
      </div>
    );
  }
}

class InstrumentSelector extends Component<{instrument: Instrument, dispatch: Function}, any> {
  render() {
    const baseClass = 'btn btn-lg btn-block ';
    const bassClass = baseClass + (this.props.instrument === 'bass' ? 'btn-primary' : 'btn-secondary');
    const guitarClass = baseClass + (this.props.instrument === 'guitar' ? 'btn-primary' : 'btn-secondary');
    return (
      <div style={{width: '100%'}} className="mt-3">
        <button
          type="button"
          className={guitarClass}
          onClick={this.props.dispatch.bind(null, {type: 'select_instrument', instrument: 'guitar'})}
        >
          Guitar
        </button>
        <button
          type="button"
          className={bassClass}
          onClick={this.props.dispatch.bind(null, {type: 'select_instrument', instrument: 'bass'})}
        >
          Bass
        </button>
      </div>
    );
  }
}

const StringRowContainer = connect(state => state)(StringRow);
const App = connect(state => state)(Main);

class DataBadge extends Component<{value: string | number}, void> {
  render() {
    return <span style={{width: '50px'}}>{this.props.value}</span>;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // $FlowFixMe
  document.getElementById('root'),
);
registerServiceWorker();
