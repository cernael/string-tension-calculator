// @flow

/* global gtag */

import type {Action} from '../types.js';

export const log = (action: Action) => {
  try {
    // $FlowFixMe ga global
    gtag('event', action.type, {
      event_category: 'redux_action',
    });
  } catch (e) {
    console.log('failed to log ga event');
    console.error(e);
  }
};
