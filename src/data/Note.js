// @flow

import {midiToFreq, scientificToMidi, midiToScientific} from './tension.js';

export class Note {
  _midi: number;
  constructor(midi: number) {
    this._midi = midi;
  }

  static fromMidi(midi: number) {
    return new Note(midi);
  }

  static fromScientific(scientific: string) {
    const midi = scientificToMidi(scientific);
    return Note.fromMidi(midi);
  }

  freq(): number {
    return midiToFreq(this._midi);
  }

  scientific(): string {
    return midiToScientific(this._midi);
  }

  midi() {
    return this._midi;
  }

  // return a new note that is `steps` steps away from the
  // original note
  interval(steps: number) {
    return new Note(this._midi + steps);
  }
}
