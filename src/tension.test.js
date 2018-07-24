// @flow

import {Note, scientificToMidi} from './tension.js';

test.each(['lol', 'Ab', 'A#11', 'A11'])(
  'from scientific blows up with %p',
  scientific => {
    expect(() => Note.fromScientific(scientific)).toThrowError('scientific');
  },
);
