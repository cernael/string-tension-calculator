// @flow

import {Note} from '../Note';

(test: any).each([['E2', -5, 'B1'], ['E2', 5, 'A2'], ['E4', 5, 'A4']])(
  '%p plus %p steps = %p',
  (note1, interval, note2) => {
    const n1 = Note.fromScientific(note1);
    const n2 = Note.fromScientific(note2);
    expect(n1.interval(interval)).toEqual(n2);
  },
);
