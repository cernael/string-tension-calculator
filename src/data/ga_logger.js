// @flow

/* global ga */

import type {Action} from '../types.js';

export const log = (action: Action) => {
  try {
    // $FlowFixMe ga global
    ga('send', {
      hitType: 'event',
      eventCategory: 'redux_action',
      eventAction: action.type,
    });
  } catch (e) {
    console.log('failed to log ga event');
    console.error(e);
  }
};
