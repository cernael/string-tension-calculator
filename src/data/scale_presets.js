// @flow

import type {Instrument} from '../types.js';

import {roundTo} from './utils.js';

export type ScalePresets = Array<{|name: string, key: string, scales: Array<number>, category?: string|}>;

const makeSingleScalePreset = (scale: number, existingScales: Array<number>) => {
  const scales = new Array(existingScales.length).fill(scale);
  return {name: `${scale}"`, key: serializeScales(scales), scales, category: 'Single Scale'};
};

const makeMultiScalePreset = (shortest: number, longest: number, existingScales: Array<number>) => {
  const step = (longest - shortest) / (existingScales.length - 1);
  const scales = new Array(existingScales.length)
    .fill(0)
    .map((_, index, result) => roundTo(shortest + index * step, 2));
  return {name: `${shortest}" - ${longest}"`, key: serializeScales(scales), scales, category: 'Multiscale'};
};

export const getScalePresets = (instrument: Instrument, existingScales: Array<number>): ScalePresets => {
  switch (instrument) {
    case 'guitar':
      return [
        ...[25.5, 24, 26, 27, 24.75].map(scale => makeSingleScalePreset(scale, existingScales)),
        ...[[25.5, 27], [25, 25.5], [25.5, 26.25], [26.5, 28]].map(([s, l]) =>
          makeMultiScalePreset(s, l, existingScales),
        ),
      ];
    case 'bass':
      return [
        ...[30, 34, 35, 36, 37, 38, 40].map(scale => makeSingleScalePreset(scale, existingScales)),
        ...[[34, 37], [37, 40], [34, 35.5], [33.5, 35]].map(([s, l]) => makeMultiScalePreset(s, l, existingScales)),
      ];
    default:
      throw new Error(`unknown instrument: "${instrument}"`);
  }
};

export const serializeScales = (scales: Array<number>) => scales.join('-');
