// @flow

import type {StringsState} from './data/StringsState.js';
import type {Note} from './data/Note.js';

export type Instrument = 'guitar' | 'bass';
export type Gauge = number;
export type UnitWeight = number;
export type PhysicalString = {gauge: Gauge, unitWeight: UnitWeight};

export type String = {|
  note: Note,
  physicalString: PhysicalString,
  scale: number,
|};

export type Action =
  | {|
      type: 'increment_note_at_index',
      index: number,
    |}
  | {|
      type: 'increment_note_all',
    |}
  | {|
      type: 'decrement_note_at_index',
      index: number,
    |}
  | {|
      type: 'decrement_note_all',
    |}
  | {|
      type: 'increment_gauge_at_index',
      index: number,
    |}
  | {|
      type: 'increment_gauge_all',
    |}
  | {|
      type: 'decrement_gauge_at_index',
      index: number,
    |}
  | {|
      type: 'decrement_gauge_all',
    |}
  | {|
      type: 'increment_scale_at_index',
      index: number,
    |}
  | {|
      type: 'increment_scale_all',
    |}
  | {|
      type: 'decrement_scale_at_index',
      index: number,
    |}
  | {|
      type: 'decrement_scale_all',
    |}
  | {|
      type: 'select_instrument',
      instrument: Instrument,
    |}
  | {|
      type: 'add_string',
    |}
  | {|
      type: 'set_scales',
      scales: Array<number>,
    |}
  | {|
      type: 'toggle_tension_help_box',
      toggle?: boolean,
    |};

export type State = {|
  strings: StringsState,
  instrument: Instrument,
  cache: {[Instrument]: StringsState},
  displayTensionHelpBox: boolean,
|};
