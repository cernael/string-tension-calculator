// @flow

const TENSION_CONST = 386.4;

const tension = (unitWeight: number, scale: number, freq: number): number => {
  return (unitWeight * Math.pow(2 * scale * freq, 2)) / TENSION_CONST;
};

export class Note {
  midi: number;
  constructor(midi: number) {
    this.midi = midi;
  }

  static fromMidi(midi) {
    return new Note(midi);
  }

  static fromScientific(scientific: string) {
    const midi = scientificToMidi(scientific);
    return Note.fromMidi(midi);
  }
}

const SCIENTIFIC = {
  'A#': 2,
  B: 3,
  A: 1,
  C: 4,
  'C#': 5,
  D: 6,
  'D#': 7,
  E: 8,
  F: 9,
  'F#': 10,
  G: 11,
  'G#': 12,
};

const SCIENTIFIC_REGEXP = /^([ABCDEFG])(\#?)(\d?)$/i;
export const scientificToMidi = (scientific: string) => {
  const match = scientific.match(SCIENTIFIC_REGEXP);
  if (!match) {
    throw new Error(
      `Expected the note to be in scientific notation ${String(
        SCIENTIFIC_REGEXP,
      )}, got ${scientific}`,
    );
  }
  return match;
};
