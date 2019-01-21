// @flow

import {Note} from './Note.js';
import {findByGauge} from './kalium_strings';
import type {String} from '../types.js';

export const GUITAR: Array<String> = [
  {
    note: Note.fromScientific('e4'),
    physicalString: findByGauge(0.009),
    scale: 25.5,
  },
  {
    note: Note.fromScientific('b3'),
    physicalString: findByGauge(0.013),
    scale: 25.5,
  },
  {
    note: Note.fromScientific('g3'),
    physicalString: findByGauge(0.017),
    scale: 25.5,
  },
  {
    note: Note.fromScientific('d3'),
    physicalString: findByGauge(0.026),
    scale: 25.5,
  },
  {
    note: Note.fromScientific('a2'),
    physicalString: findByGauge(0.037),
    scale: 25.5,
  },
  {
    note: Note.fromScientific('e2'),
    physicalString: findByGauge(0.053),
    scale: 25.5,
  },
];

export const BASS: Array<String> = [
  {
    note: Note.fromScientific('g2'),
    physicalString: findByGauge(0.037),
    scale: 34,
  },
  {
    note: Note.fromScientific('d2'),
    physicalString: findByGauge(0.051),
    scale: 34,
  },
  {
    note: Note.fromScientific('a1'),
    physicalString: findByGauge(0.073),
    scale: 34,
  },
  {
    note: Note.fromScientific('e1'),
    physicalString: findByGauge(0.11),
    scale: 34,
  },
];

export const forInstrument = {
  guitar: GUITAR,
  bass: BASS,
};
