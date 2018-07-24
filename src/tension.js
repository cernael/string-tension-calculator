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

  static fromMidi(midi: number) {
    return new Note(midi);
  }

  static fromScientific(scientific: string) {
    const midi = scientificToMidi(scientific);
    return Note.fromMidi(midi);
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
const FIRST_OCTAVE = -5;

const SCIENTIFIC_REGEXP = /^([ABCDEFG])(\#?)(\-?\d?)$/i;
export const scientificToMidi = (scientific: string): number => {
  const match = scientific.match(SCIENTIFIC_REGEXP);
  if (!match) {
    throw new Error(
      `Expected the note to be in scientific notation ${String(
        SCIENTIFIC_REGEXP,
      )}, got ${scientific}`,
    );
  }

  const letter = match[1].toLowerCase();
  const sharp = !!match[2];
  const octave = parseInt(match[3], 10);
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
  return `${MIDI[baseMidi].toUpperCase()}${octave + FIRST_OCTAVE}`;
};
