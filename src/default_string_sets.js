import {Note} from './tension';
import {findByGauge} from './kalium_strings';

export type String = {
  note: Note,
  physicalString: PhysicalString,
  scale: number,
};

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
    physicalString: findByGauge(0.024),
    scale: 25.5,
  },
  {
    note: Note.fromScientific('a2'),
    physicalString: findByGauge(0.033),
    scale: 25.5,
  },
  {
    note: Note.fromScientific('e2'),
    physicalString: findByGauge(0.045),
    scale: 25.5,
  },
];

export const BASS: Array<String> = [
  {
    note: Note.fromScientific('g2'),
    physicalString: findByGauge(0.043),
    scale: 34,
  },
  {
    note: Note.fromScientific('d2'),
    physicalString: findByGauge(0.057),
    scale: 34.75,
  },
  {
    note: Note.fromScientific('a1'),
    physicalString: findByGauge(0.076),
    scale: 35.5,
  },
  {
    note: Note.fromScientific('e1'),
    physicalString: findByGauge(0.098),
    scale: 36.25,
  },
  {
    note: Note.fromScientific('b0'),
    physicalString: findByGauge(0.13),
    scale: 37,
  },
];

export const forInstrument = {
  guitar: GUITAR,
  bass: BASS,
};
