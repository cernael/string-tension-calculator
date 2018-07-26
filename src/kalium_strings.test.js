// @flow

import {findByGauge, findNext, findPrevious} from './kalium_strings';

(test: any).each([0.059, 0.11, 0.114])('finds %p string', gauge => {
  expect(findByGauge(gauge)).toHaveProperty('gauge', gauge);
  expect(findByGauge(gauge)).toHaveProperty('unitWeight');
});

(test: any).each([0.0333, 0.33, 0, 1])('doesnt find %p string', gauge => {
  expect(() => findByGauge(gauge)).toThrow(/gauge/);
});

(test: any).each([
  [0.15, 0.142, 0.158],
  [0.254, 0.244, 0.266],
  [0.01, 0.0095, 0.0105],
])('for %p, next: %p, prev: %p', (gauge, prev, next) => {
  expect(findNext(gauge)).toMatchObject({gauge: next});
  expect(findPrevious(gauge)).toMatchObject({gauge: prev});
});

test('wont find thinner string', () => {
  expect(findPrevious(0.008)).toBeUndefined();
});
test('wont find thicker string', () => {
  expect(findNext(0.266)).toBeUndefined();
});
