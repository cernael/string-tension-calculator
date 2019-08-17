// @flow

import type {String, PhysicalString} from '../types.js';

import {data as KaliumStrings} from './kalium_strings.js';
import {getTension} from './tension.js';
import {Note} from './Note.js';

export const roundTo = (number: number, digits: number) => {
  return Math.floor(number * Math.pow(10, digits)) / Math.pow(10, digits);
};

// Make a new string to add to an istrument based on the
// last string available given for that instrument.
// e.g. if we have a 4 string bass in standard tuning
// and try to add a 5 string, it'll try to add a 5th string
// in B with relatevily the same tension
export const makeNextString = (string: String): String => {
  let nextNote = string.note.interval(-5);
  if (nextNote.midi() < 0) {
    // the lowest note possible
    nextNote = Note.fromMidi(0);
  }
  const nextScale = string.scale;
  const physicalString = closestToTension({
    tension: getTension({unitWeight: string.physicalString.unitWeight, scale: string.scale, freq: string.note.freq()}),
    scale: nextScale,
    note: nextNote,
  });
  return {
    note: nextNote,
    scale: nextScale,
    physicalString,
  };
};

// Given scale and note, find a physical string that when used
// is as close to given tension as possible.
// e.g. if i want to have 14lbs tuned in E2 on 25.5 scale it'll be
// close to using 0.039 gauge string.
export const closestToTension = ({
  tension: targetTension,
  scale,
  note,
}: {|
  tension: number,
  scale: number,
  note: Note,
|}): PhysicalString => {
  const resultsWithTensionDifference = KaliumStrings.map(physicalString => {
    const tension = getTension({unitWeight: physicalString.unitWeight, scale, freq: note.freq()});

    return {tensionDifference: Math.abs(tension - targetTension), physicalString};
  });

  let lastMinimumTensionDifference = resultsWithTensionDifference[0];

  for (const r of resultsWithTensionDifference) {
    if (lastMinimumTensionDifference.tensionDifference > r.tensionDifference) {
      lastMinimumTensionDifference = r;
    }
  }

  return lastMinimumTensionDifference.physicalString;
};
