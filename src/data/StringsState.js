// @flow

import type {String} from '../types.js';

import {Note} from './Note.js';
import {findNext, findPrevious} from './kalium_strings';

export class StringsState {
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
  incrementNoteAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.incrementNoteForStringAtIndex(index), this);
  }
  decrementNoteForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    string.note = Note.fromMidi(string.note.midi() - 1);
    return this.setString(index, string);
  }
  decrementNoteAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.decrementNoteForStringAtIndex(index), this);
  }
  incrementGaugeForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    const physicalString = findNext(string.physicalString.gauge);
    return physicalString ? this.setString(index, {...string, physicalString}) : this;
  }
  incrementGaugeAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.incrementGaugeForStringAtIndex(index), this);
  }
  decrementGaugeForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    const physicalString = findPrevious(string.physicalString.gauge);
    return physicalString ? this.setString(index, {...string, physicalString}) : this;
  }
  decrementGaugeAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.decrementGaugeForStringAtIndex(index), this);
  }
  incrementScaleForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    string.scale = string.scale + 0.25;
    return this.setString(index, string);
  }
  incrementScaleAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.incrementScaleForStringAtIndex(index), this);
  }
  decrementScaleForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    string.scale = string.scale - 0.25;
    return this.setString(index, string);
  }
  decrementScaleAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.decrementScaleForStringAtIndex(index), this);
  }
}
