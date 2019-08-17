// @flow

import {findByGauge, findNext, findPrevious, data} from '../kalium_strings';
import {getTension} from '../tension.js';
import {Note} from '../Note.js';
import {roundTo} from '../utils.js';
import leftPad from 'left-pad';

(test: any).each([0.059, 0.11, 0.114])('finds %p string', gauge => {
  expect(findByGauge(gauge)).toHaveProperty('gauge', gauge);
  expect(findByGauge(gauge)).toHaveProperty('unitWeight');
});

(test: any).each([0.0333, 0.33, 0, 1])('doesnt find %p string', gauge => {
  expect(() => findByGauge(gauge)).toThrow(/gauge/);
});

test('string search', () => {
  let result = [];
  let gauge = 0.005;
  while (gauge < 0.28) {
    const prev = findPrevious(gauge);
    const next = findNext(gauge);

    const cg = leftPad(roundTo(gauge, 4), 7);
    const pg = prev ? leftPad(roundTo(prev.gauge, 4), 7) : leftPad('NONE', 7);
    const ng = next ? leftPad(roundTo(next.gauge, 4), 7) : leftPad('NONE', 7);
    result.push(`gauge: ${cg} | prev: ${pg} | next: ${ng}`);

    gauge += 0.001;
  }
  expect(result).toMatchSnapshot();
});

test('snapshot all tensions for a freq', () => {
  const note = Note.fromScientific('A3');
  expect(
    data.map(({gauge, unitWeight}) => {
      const tension = getTension({unitWeight, scale: 25.5, freq: note.freq()});
      return `gauge: ${leftPad(gauge, 10)} | tension: ${leftPad(roundTo(tension, 2), 10)}`;
    }),
  ).toMatchSnapshot();
});
