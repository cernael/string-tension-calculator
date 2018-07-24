// @flow

import React, {Component} from 'react';
import './App.css';

type Note = {scientific: string};

type String = {
  index: number,
  note: Note,
};

class StringsState {
  strings: Array<String>;
  constructor() {
    this.strings = [
      {index: 1, note: {scientific: 'A0'}},
      {index: 2, note: {scientific: 'A1'}},
    ];
  }
}

class App extends Component<void, {stringsState: StringsState}> {
  constructor() {
    super();
    this.state = {stringsState: new StringsState()};
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">string tension calculator</h1>
        </header>
        <div className="container">
          <div className="row justify-content-md-center">
            <table>
              {this.state.stringsState.strings.map(s => (
                <StringRow note={s.note} />
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

type StringRowProps = {
  note: Note,
};

class StringRow extends Component<StringRowProps> {
  render() {
    return (
      <tr>
        <td>{this.props.note.scientific}</td>
      </tr>
    );
  }
}

export default App;
