// @flow

import {Note, scientificToMidi, midiToScientific} from './tension.js';

(test: any).each(['lol', 'Ab', 'A#11', 'A11'])(
  'from scientific blows up with %p',
  scientific => {
    expect(() => Note.fromScientific(scientific)).toThrowError('scientific');
  },
);

(test: any).each(['B#', 'E#'])('%p is not a thing', scientific => {
  expect(() => Note.fromScientific(scientific)).toThrowError(
    /don't have sharp/,
  );
});

const testNotes = [
  ['A-5', 9],
  ['A-4', 21],
  ['A#-4', 22],
  ['C-2', 36],
  ['c-5', 0],
  ['g5', 127],
  ['c0', 60],
  ['c#0', 61],
  ['d0', 62],
  ['d#0', 63],
  ['e0', 64],
  ['f0', 65],
  ['f#0', 66],
  ['g0', 67],
  ['g#0', 68],
  ['a0', 69],
  ['a#0', 70],
  ['b0', 71],
];

(test: any).each(testNotes)('midi for %p is %p', (scientific, midi) => {
  expect(Note.fromScientific(scientific).midi).toBe(midi);
});

(test: any).each(testNotes)('scientific for %p is %p', (scientific, midi) => {
  expect(midiToScientific(midi)).toBe(scientific.toUpperCase());
});
