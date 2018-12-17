// @flow

/* global ga */

import type {Action} from '../types.js';

export const log = (action: Action) => {
  try {
    // $FlowFixMe ga global
    ga('send', 'event', {
      eventCategory: 'redux_action',
      evertAction: action.type,
    });
  } catch (e) {
    console.log('failed to log ga event');
    console.error(e);
  }
};
