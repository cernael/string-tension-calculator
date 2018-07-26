// @flow

import type {PhysicalString} from './kalium_strings';
import React, {Component} from 'react';
import './App.css';
import {Note, getTension, getTightnessColor} from './tension';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {findByGauge, findNext, findPrevious} from './kalium_strings';

const HARDCODED_SCALE = 25.5;

type String = {
  note: Note,
  physicalString: PhysicalString,
};

type Action =
  | {|
      type: 'increment_note_at_index',
      index: number,
    |}
  | {|
      type: 'decrement_note_at_index',
      index: number,
    |}
  | {|
      type: 'increment_gauge_at_index',
      index: number,
    |}
  | {|
      type: 'decrement_gauge_at_index',
      index: number,
    |};

class StringsState {
  _strings: Array<String>;
  constructor(strings) {
    this._strings = strings || [
      {note: Note.fromScientific('e4'), physicalString: findByGauge(0.009)},
      {note: Note.fromScientific('b3'), physicalString: findByGauge(0.013)},
      {note: Note.fromScientific('g3'), physicalString: findByGauge(0.017)},
      {note: Note.fromScientific('d3'), physicalString: findByGauge(0.024)},
      {note: Note.fromScientific('a2'), physicalString: findByGauge(0.033)},
      {note: Note.fromScientific('e2'), physicalString: findByGauge(0.045)},
    ];
  }

  getStrings() {
    return this._strings;
  }

  getString(index: number) {
    const string = this._strings[index];
    if (!string) {
      throw new Error(
        `there's no string with index ${index}, strings: ${JSON.stringify(
          this._strings,
        )}`,
      );
    }
    return string;
  }

  setString(index: number, string: String): StringsState {
    if (index != 0 && !this._strings[index - 1]) {
      throw new Error(
        `can't set sparse strings. string index given: ${index}, strings: ${JSON.stringify(
          this._strings,
        )}`,
      );
    }
    const strings = [...this._strings];
    strings[index] = string;
    return new StringsState(strings);
  }

  incrementNoteForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    string.note = Note.fromMidi(string.note.midi() + 1);
    return this.setString(index, string);
  }
  decrementNoteForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    string.note = Note.fromMidi(string.note.midi() - 1);
    return this.setString(index, string);
  }
  incrementGaugeForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    const physicalString = findNext(string.physicalString.gauge);
    return physicalString
      ? this.setString(index, {...string, physicalString})
      : this;
  }
  decrementGaugeForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    const physicalString = findPrevious(string.physicalString.gauge);
    return physicalString
      ? this.setString(index, {...string, physicalString})
      : this;
  }
}
type State = {
  strings: StringsState,
};

const reducer = (state: State | void, action: Action): State => {
  if (typeof state === 'undefined') {
    return {strings: new StringsState()};
  }
  switch (action.type) {
    case 'increment_note_at_index':
      return {
        ...state,
        strings: state.strings.incrementNoteForStringAtIndex(action.index),
      };
    case 'decrement_note_at_index':
      return {
        ...state,
        strings: state.strings.decrementNoteForStringAtIndex(action.index),
      };
    case 'increment_gauge_at_index':
      return {
        ...state,
        strings: state.strings.incrementGaugeForStringAtIndex(action.index),
      };
    case 'decrement_gauge_at_index':
      return {
        ...state,
        strings: state.strings.decrementGaugeForStringAtIndex(action.index),
      };
    default:
      return state;
  }
};
const store = createStore(reducer);

class Main extends Component<{strings: StringsState}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">string tension calculator</h1>
        </header>
        <div className="container">
          <div className="row justify-content-md-center">
            <table className="table table-bordered mt-5">
              <thead className="thead-dark">
                <tr>
                  <th>Note</th>
                  <th>Gauge</th>
                  <th>Tension</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {this.props.strings
                  .getStrings()
                  .map((s, index) => (
                    <StringRowContainer index={index} string={s} key={index} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

type StringRowProps = {
  string: String,
  index: number,
  dispatch: Action => void,
};

class StringRow extends Component<StringRowProps> {
  render() {
    const scientific = this.props.string.note.scientific();
    const scale = HARDCODED_SCALE;
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
          {scientific}
          <div className="btn-group-vertical ml-5">
            {' '}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.dispatch.bind(null, {
                type: 'increment_note_at_index',
                index: this.props.index,
              })}
            >
              ^
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.dispatch.bind(null, {
                type: 'decrement_note_at_index',
                index: this.props.index,
              })}
            >
              v
            </button>
          </div>
        </td>
        <td>
          {this.props.string.physicalString.gauge}{' '}
          <div className="btn-group-vertical ml-5">
            {' '}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.dispatch.bind(null, {
                type: 'increment_gauge_at_index',
                index: this.props.index,
              })}
            >
              ^
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.dispatch.bind(null, {
                type: 'decrement_gauge_at_index',
                index: this.props.index,
              })}
            >
              v
            </button>
          </div>
        </td>
        <td style={{backgroundColor: getTightnessColor({tension, scale})}}>
          {tension}
        </td>
        <td>{this.props.string.note.freq()}</td>
      </tr>
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
