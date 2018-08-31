// @flow

import type {Instrument} from './tension';
import type {String} from './default_string_sets';

import React, {Component} from 'react';
import './App.css';
import {Note, getTension, getTightnessColor} from './tension';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {findNext, findPrevious} from './kalium_strings';
import {forInstrument, BASS} from './default_string_sets';

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
    |}
  | {|
      type: 'increment_scale_at_index',
      index: number,
    |}
  | {|
      type: 'decrement_scale_at_index',
      index: number,
    |}
  | {|
      type: 'select_instrument',
      instrument: Instrument,
    |};

class StringsState {
  _strings: Array<String>;
  constructor(strings: Array<String>) {
    this._strings = strings;
  }

  getStrings() {
    return this._strings;
  }

  getString(index: number) {
    const string = this._strings[index];
    if (!string) {
      throw new Error(`there's no string with index ${index}, strings: ${JSON.stringify(this._strings)}`);
    }
    return string;
  }

  setString(index: number, string: String): StringsState {
    if (index !== 0 && !this._strings[index - 1]) {
      throw new Error(
        `can't set sparse strings. string index given: ${index}, strings: ${JSON.stringify(this._strings)}`,
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
    return physicalString ? this.setString(index, {...string, physicalString}) : this;
  }
  decrementGaugeForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    const physicalString = findPrevious(string.physicalString.gauge);
    return physicalString ? this.setString(index, {...string, physicalString}) : this;
  }
  incrementScaleForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    string.scale = string.scale + 0.25;
    return this.setString(index, string);
  }
  decrementScaleForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    string.scale = string.scale - 0.25;
    return this.setString(index, string);
  }
}
type State = {
  strings: StringsState,
  instrument: Instrument,
  cache: {[Instrument]: StringsState},
};

const reducer = (state: State | void, action: Action): State => {
  if (typeof state === 'undefined') {
    return {strings: new StringsState(BASS), cache: {}, instrument: 'bass'};
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
    case 'increment_scale_at_index':
      return {
        ...state,
        strings: state.strings.incrementScaleForStringAtIndex(action.index),
      };
    case 'decrement_scale_at_index':
      return {
        ...state,
        strings: state.strings.decrementScaleForStringAtIndex(action.index),
      };
    case 'select_instrument': {
      return state.instrument === action.instrument
        ? state
        : {
            ...state,
            strings: state.cache[action.instrument] || new StringsState(forInstrument[action.instrument]),
            instrument: action.instrument,
            cache: {
              ...state.cache,
              ...{[state.instrument]: state.strings},
            },
          };
    }
    default:
      return state;
  }
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
          </div>
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
          {this.props.string.scale}
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

        <td style={{backgroundColor: getTightnessColor({tension, scale, instrument: this.props.instrument})}}>
          {tension}
        </td>
        <td>{this.props.string.note.freq()}</td>
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
          className={bassClass}
          onClick={this.props.dispatch.bind(null, {type: 'select_instrument', instrument: 'bass'})}
        >
          Bass
        </button>
        <button
          type="button"
          className={guitarClass}
          onClick={this.props.dispatch.bind(null, {type: 'select_instrument', instrument: 'guitar'})}
        >
          Guitar
        </button>
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
