// @flow

import {
  Note,
  scientificToMidi,
  midiToScientific,
  midiToFreq,
} from './tension.js';

(test: any).each(['lol', 'Ab', 'A#11t', 'A1?1'])(
  'from scientific blows up with %p',
  scientific => {
    expect(() => Note.fromScientific(scientific)).toThrowError('scientific');
  },
);

(test: any).each(['c-2', 'a-10', 'b-3'])('%p is too low', scientific => {
  expect(() => Note.fromScientific(scientific)).toThrowError('lowest octave');
});

(test: any).each(['B#', 'E#'])('%p is not a thing', scientific => {
  expect(() => Note.fromScientific(scientific)).toThrowError(
    /don't have sharp/,
  );
});

const testNotes = [
  ['c-1', 0],
  ['A-1', 9],
  ['A0', 21],
  ['A#0', 22],
  ['C2', 36],
  ['c-1', 0],
  ['g9', 127],
  ['c4', 60],
  ['c#4', 61],
  ['d4', 62],
  ['d#4', 63],
  ['e4', 64],
  ['f4', 65],
  ['f#4', 66],
  ['g4', 67],
  ['g#4', 68],
  ['a4', 69],
  ['a#4', 70],
  ['b4', 71],
];

(test: any).each(testNotes)('midi for %p is %p', (scientific, midi) => {
  expect(Note.fromScientific(scientific).midi).toBe(midi);
});

(test: any).each(testNotes)('scientific for %p is %p', (scientific, midi) => {
  expect(midiToScientific(midi)).toBe(scientific.toUpperCase());
});

(test: any).each([
  ['c-1', 8.175],
  ['a-1', 13.75],
  ['c-1', 8.1757989156],
  ['a4', 440.0],
  ['g9', 12543.853951416],
  ['a3', 220.0],
  ['a2', 110.0],
])('%p is %pHz', (scientific, freq) => {
  expect(midiToFreq(scientificToMidi(scientific))).toBeCloseTo(freq);
});
