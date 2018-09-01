// @flow

import Color from 'color';

export type Instrument = 'guitar' | 'bass';

const TENSION_CONST = 386.4;

export const getTension = ({unitWeight, scale, freq}: {unitWeight: number, scale: number, freq: number}): number => {
  return (unitWeight * Math.pow(2 * scale * freq, 2)) / TENSION_CONST;
};

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

  freq() {
    return midiToFreq(this._midi);
  }

  scientific() {
    return midiToScientific(this._midi);
  }

  midi() {
    return this._midi;
  }
}

const SCIENTIFIC = {
  c: 0,
  d: 2,
  e: 4,
  f: 5,
  g: 7,
  a: 9,
  b: 11,
};

const MIDI = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

// 0 midi is A-5
const FIRST_OCTAVE = -1;

const SCIENTIFIC_REGEXP = /^([ABCDEFG])(#?)(-?\d*)$/i;
export const scientificToMidi = (scientific: string): number => {
  const match = scientific.match(SCIENTIFIC_REGEXP);
  if (!match) {
    throw new Error(`Expected the note to be in scientific notation ${String(SCIENTIFIC_REGEXP)}, got ${scientific}`);
  }

  const letter = match[1].toLowerCase();
  const sharp = !!match[2];
  const octave = parseInt(match[3], 10);
  if (octave < -1) {
    throw new Error('-1 is the lowest octave available');
  }
  if (['b', 'e'].includes(letter) && sharp === true) {
    throw new Error(`B and E don't have sharps. got: ${scientific}`);
  }

  let baseMidi = SCIENTIFIC[letter];
  if (sharp) {
    baseMidi += 1;
  }
  return baseMidi + (octave - FIRST_OCTAVE) * 12;
};

export const midiToScientific = (midi: number) => {
  const octave = Math.floor(midi / 12);
  const baseMidi = midi % 12;
  const baseNote = MIDI[baseMidi];
  if (!baseNote) {
    throw new Error(
      `can't find the base note baseMidi: ${baseMidi}, base notes: ${JSON.stringify(MIDI)}, midi: ${midi}`,
    );
  }
  return `${baseNote.toUpperCase()}${octave + FIRST_OCTAVE}`;
};

const C0_FREQ = 8.1757989156;
const NOTE_TO_FREQ_CONST = Math.pow(2, 1 / 12);

export const midiToFreq = (midi: number) => {
  return C0_FREQ * Math.pow(NOTE_TO_FREQ_CONST, midi);
};

type Metrics = {
  [Instrument]: {
    // lbs that is considered a regular/medium tension for this instrument
    regularTension: number,
    // number of lbs that if added or removed would make the tension extra heavy/light.
    // e.g. if regular tension is 18 and delta is 4, then 22 would be considered extra heavy and
    // 14 would be considered extra light
    delta: number,
  },
};
const TENSION_METRICS: Metrics = {
  guitar: {
    regularTension: 19,
    delta: 6,
  },
  bass: {
    regularTension: 40,
    delta: 10,
  },
};

type HowTight = {|direction: 'HEAVY' | 'LIGHT', howMuch: number|} | {|direction: 'UNKNOWN'|};

export const howTight = ({tension, instrument}: {|tension: number, instrument: Instrument|}): HowTight => {
  const {regularTension, delta} = TENSION_METRICS[instrument];
  const direction = tension >= regularTension ? 'HEAVY' : 'LIGHT';
  const howMuch = Math.abs((tension - regularTension) / (delta / 100));
  return {direction, howMuch};
};

export const getTightnessColor = ({tension, instrument}: {|tension: number, instrument: Instrument|}) => {
  const result = howTight({tension, instrument});
  if (result.direction === 'UNKNOWN') {
    return Color.rgb(200, 200, 200);
  }
  const {direction, howMuch} = result;
  const color = direction === 'HEAVY' ? Color.rgb(255, 0, 0) : Color.rgb(255, 255, 0);
  const intensity = 1 - Math.min(howMuch / 200, 1); // 0 to 1
  return color.lighten(intensity).string();
};
