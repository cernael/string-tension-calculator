// @flow

import type {String} from '../../types.js';
import {closestToTension, makeNextString} from '../utils.js';
import {Note} from '../Note.js';
import {findByGauge} from '../kalium_strings.js';

const g045 = findByGauge(0.045);

describe.skip('nextString()', () => {
  const testStrings: Array<[String, String]> = [
    [
      {
        note: Note.fromScientific('E2'),
        scale: 25.5,
        physicalString: g045,
      },
      {
        note: Note.fromScientific('B2'),
        scale: 25.5,
        physicalString: g045,
      },
    ],
  ];
  (test: any).each(testStrings)('midi for %p is %p', (lastString, nextString) => {
    expect(makeNextString(lastString)).toEqual(nextString);
  });
});

(test: any).each([
  [13, 25.5, 'E4', 0.009],
  [13, 25.5, 'E2', 0.037],
  [43.8, 35.25, 'A1', 0.076],
  [33, 37, 'B0', 0.114],
  [14, 27, 'E2', 0.037],
])('%p lbs on %p inch scale tuned to %p is the closest to %p gauge string', (tension, scale, scientific, gauge) => {
  expect(closestToTension({tension, scale, note: Note.fromScientific(scientific)}).gauge).toEqual(gauge);
});
