// @flow

import type {State, Action} from '../types.js';

import {forInstrument, GUITAR} from './default_string_sets';
import {StringsState} from './StringsState.js';

export const reducer = (state: State | void, action: Action): State => {
  if (typeof state === 'undefined') {
    return {strings: new StringsState(GUITAR), cache: {}, instrument: 'guitar'};
  }

  switch (action.type) {
    case 'increment_note_at_index':
      return {
        ...state,
        strings: state.strings.incrementNoteForStringAtIndex(action.index),
      };
    case 'decrement_note_at_index':
      return {
        ...state,
        strings: state.strings.decrementNoteForStringAtIndex(action.index),
      };
    case 'increment_gauge_at_index':
      return {
        ...state,
        strings: state.strings.incrementGaugeForStringAtIndex(action.index),
      };
    case 'decrement_gauge_at_index':
      return {
        ...state,
        strings: state.strings.decrementGaugeForStringAtIndex(action.index),
      };
    case 'increment_scale_at_index':
      return {
        ...state,
        strings: state.strings.incrementScaleForStringAtIndex(action.index),
      };
    case 'decrement_scale_at_index':
      return {
        ...state,
        strings: state.strings.decrementScaleForStringAtIndex(action.index),
      };
    case 'select_instrument': {
      return state.instrument === action.instrument
        ? state
        : {
            ...state,
            strings: state.cache[action.instrument] || new StringsState(forInstrument[action.instrument]),
            instrument: action.instrument,
            cache: {
              ...state.cache,
              ...{[state.instrument]: state.strings},
            },
          };
    }
    default:
      return state;
  }
};