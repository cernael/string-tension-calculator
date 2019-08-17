// @flow

import type {Action} from '../types.js';
import {createStore} from 'redux';
import {reducer} from './reducer.js';

// $FlowFixMe
export const store = createStore(reducer);

export const dispatch: (action: Action) => void = store.dispatch;
