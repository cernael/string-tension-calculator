// @flow

import type {String} from '../types.js';

import {Note} from './Note.js';
import {findNext, findPrevious} from './kalium_strings';
import {makeNextString} from './utils.js';
import invariant from '../invariant.js';

export class StringsState {
  _strings: Array<String>;
  constructor(strings: Array<String>) {
    this._strings = strings;
  }

  getStrings(): Array<String> {
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
    if (index !== this._strings.length && (index !== 0 && !this._strings[index - 1])) {
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
    const newMidi = string.note.midi() - 1;
    // If it's the lowest note, keep it unchanged
    if (newMidi < 0) {
      return this;
    }
    string.note = Note.fromMidi(newMidi);
    return this.setString(index, string);
  }
  decrementNoteAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.decrementNoteForStringAtIndex(index), this);
  }
  incrementGaugeForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    const physicalString = findNext(string.physicalString);
    return physicalString ? this.setString(index, {...string, physicalString}) : this;
  }
  incrementGaugeAll(): StringsState {
    return this._strings.reduce((result, strings, index) => result.incrementGaugeForStringAtIndex(index), this);
  }
  decrementGaugeForStringAtIndex(index: number): StringsState {
    const string = this.getString(index);
    const physicalString = findPrevious(string.physicalString);
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
  addString(): StringsState {
    const lastString = this._strings[this._strings.length - 1];
    const newIndex = this._strings.length;
    const newString = makeNextString(lastString);
    return this.setString(newIndex, newString);
  }
  setScales(scales: Array<number>) {
    invariant(
      this._strings.length === scales.length,
      `Can't set scales, because current state has different number of strings.`,
    );
    const strings = this._strings.map((s, index) => ({...s, scale: scales[index]}));
    return new StringsState(strings);
  }
}
