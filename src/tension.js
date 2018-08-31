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

// See description of https://www.youtube.com/watch?v=ZxiaiA8ejqs
const TIGHTNESS_DATA = {
  guitar: [
    {
      lowerScale: 25,
      higherScale: 27,
      mediumTension: 18,
      margin: 2,
    },
    {
      lowerScale: 27,
      higherScale: 29,
      mediumTension: 23,
      margin: 3,
    },
    {
      lowerScale: 29,
      higherScale: 31,
      mediumTension: 29,
      margin: 4,
    },
  ],
  bass: [
    {
      lowerScale: 30,
      higherScale: 34,
      mediumTension: 29,
      margin: 4,
    },
    {
      lowerScale: 34,
      higherScale: 36,
      mediumTension: 40,
      margin: 8,
    },
    {
      lowerScale: 36,
      higherScale: 38,
      mediumTension: 41,
      margin: 8,
    },
    {
      lowerScale: 39,
      higherScale: 42,
      mediumTension: 42,
      margin: 8,
    },
  ],
};

type HowTight = {|direction: 'HEAVY' | 'LIGHT', howMuch: number|} | {|direction: 'UNKNOWN'|};

export const howTight = ({
  tension,
  scale,
  instrument,
}: {
  tension: number,
  scale: number,
  instrument: Instrument,
}): HowTight => {
  const data = TIGHTNESS_DATA[instrument].find(
    ({lowerScale, higherScale}) => scale >= lowerScale && scale <= higherScale,
  );
  if (!data) {
    return {direction: 'UNKNOWN'};
  }
  const direction = tension >= data.mediumTension ? 'HEAVY' : 'LIGHT';
  const howMuch = Math.abs((tension - data.mediumTension) / (data.margin / 100));
  return {direction, howMuch};
};

export const getTightnessColor = ({
  tension,
  scale,
  instrument,
}: {
  tension: number,
  scale: number,
  instrument: Instrument,
}) => {
  const result = howTight({tension, scale, instrument});
  if (result.direction === 'UNKNOWN') {
    return Color.rgb(200, 200, 200);
  }
  const {direction, howMuch} = result;
  const color = direction === 'HEAVY' ? Color.rgb(255, 0, 0) : Color.rgb(255, 255, 0);
  const intensity = 1 - Math.min(howMuch / 500, 1); // 0 to 1
  return color.lighten(intensity).string();
};
