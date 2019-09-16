// @flow

import type {PhysicalString, Gauge} from '../types.js';

export const data: Array<PhysicalString> = [
  {gauge: 0.008, unitWeight: 0.00001424},
  {gauge: 0.0085, unitWeight: 0.000016075},
  {gauge: 0.009, unitWeight: 0.000018022},
  {gauge: 0.0095, unitWeight: 0.00002008},
  {gauge: 0.01, unitWeight: 0.000022252},
  {gauge: 0.0105, unitWeight: 0.000024531},
  {gauge: 0.011, unitWeight: 0.000026925},
  {gauge: 0.0115, unitWeight: 0.000029425},
  {gauge: 0.012, unitWeight: 0.000032039},
  {gauge: 0.0125, unitWeight: 0.000034765},
  {gauge: 0.013, unitWeight: 0.000037605},
  {gauge: 0.0135, unitWeight: 0.000040551},
  {gauge: 0.014, unitWeight: 0.000043607},
  {gauge: 0.015, unitWeight: 0.00005005},
  {gauge: 0.016, unitWeight: 0.000056961},
  {gauge: 0.017, unitWeight: 0.0000643},
  {gauge: 0.018, unitWeight: 0.000072088},
  {gauge: 0.019, unitWeight: 0.00008036},
  {gauge: 0.02, unitWeight: 0.000089031},
  {gauge: 0.021, unitWeight: 0.00009387286685, type: 'w'},
  {gauge: 0.021, unitWeight: 0.0000981546917942, type: 'p'},
  {gauge: 0.022, unitWeight: 0.000103862422, type: 'w'},
  {gauge: 0.022, unitWeight: 0.00010766580534, type: 'p'},
  {gauge: 0.023, unitWeight: 0.00011398499841, type: 'w'},
  {gauge: 0.023, unitWeight: 0.000117702448211, type: 'p'},
  {gauge: 0.024, unitWeight: 0.000124963},
  {gauge: 0.025, unitWeight: 0.000136054},
  {gauge: 0.026, unitWeight: 0.000144691},
  {gauge: 0.027, unitWeight: 0.000153146},
  {gauge: 0.028, unitWeight: 0.000161203},
  {gauge: 0.029, unitWeight: 0.000178551},
  {gauge: 0.031, unitWeight: 0.000198902},
  {gauge: 0.033, unitWeight: 0.000223217},
  {gauge: 0.035, unitWeight: 0.000249034},
  {gauge: 0.037, unitWeight: 0.000276237},
  {gauge: 0.039, unitWeight: 0.000304788},
  {gauge: 0.041, unitWeight: 0.000334965},
  {gauge: 0.043, unitWeight: 0.000366357},
  {gauge: 0.045, unitWeight: 0.000404956},
  {gauge: 0.047, unitWeight: 0.000447408},
  {gauge: 0.049, unitWeight: 0.000475438},
  {gauge: 0.051, unitWeight: 0.000512645},
  {gauge: 0.053, unitWeight: 0.000551898},
  {gauge: 0.055, unitWeight: 0.000584407},
  {gauge: 0.057, unitWeight: 0.000625704},
  {gauge: 0.059, unitWeight: 0.000679149},
  {gauge: 0.061, unitWeight: 0.000720293},
  {gauge: 0.063, unitWeight: 0.000765973},
  {gauge: 0.065, unitWeight: 0.000821116},
  {gauge: 0.067, unitWeight: 0.000870707},
  {gauge: 0.07, unitWeight: 0.000939851},
  {gauge: 0.073, unitWeight: 0.001021518},
  {gauge: 0.076, unitWeight: 0.001110192},
  {gauge: 0.079, unitWeight: 0.001188974},
  {gauge: 0.082, unitWeight: 0.001293598},
  {gauge: 0.086, unitWeight: 0.001416131},
  {gauge: 0.09, unitWeight: 0.001544107},
  {gauge: 0.094, unitWeight: 0.001677765},
  {gauge: 0.098, unitWeight: 0.001831487},
  {gauge: 0.102, unitWeight: 0.001986524},
  {gauge: 0.106, unitWeight: 0.002127413},
  {gauge: 0.11, unitWeight: 0.002286733},
  {gauge: 0.114, unitWeight: 0.002449286},
  {gauge: 0.118, unitWeight: 0.002616406},
  {gauge: 0.124, unitWeight: 0.002880915},
  {gauge: 0.13, unitWeight: 0.003154996},
  {gauge: 0.136, unitWeight: 0.003441822},
  {gauge: 0.142, unitWeight: 0.003741715},
  {gauge: 0.148, unitWeight: 0.004051505},
  {gauge: 0.154, unitWeight: 0.004375389},
  {gauge: 0.16, unitWeight: 0.004712133},
  {gauge: 0.168, unitWeight: 0.005204133},
  {gauge: 0.176, unitWeight: 0.005691179},
  {gauge: 0.184, unitWeight: 0.006219447},
  {gauge: 0.192, unitWeight: 0.006742017},
  {gauge: 0.2, unitWeight: 0.007409517},
  {gauge: 0.208, unitWeight: 0.007875038},
  {gauge: 0.216, unitWeight: 0.008477001},
  {gauge: 0.226, unitWeight: 0.009397395},
  {gauge: 0.236, unitWeight: 0.010222903},
  {gauge: 0.246, unitWeight: 0.011082025},
  {gauge: 0.256, unitWeight: 0.011969036},
  {gauge: 0.266, unitWeight: 0.012897577},
];

export const findByGauge = (gauge: Gauge): PhysicalString => {
  const string = data.find(string => string.gauge === gauge);
  if (!string) {
    throw new Error(`could not find a string with the gauge: %{gauge}`);
  }
  return string;
};

export const findNext = (string: PhysicalString): ?PhysicalString => {
  return data.find(next => next.unitWeight > string.unitWeight);
};

export const findPrevious = (string: PhysicalString): ?PhysicalString => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] && data[i].unitWeight < string.unitWeight) {
      return data[i];
    }
  }
};

export const formatStringGauge = (string: PhysicalString) => {
  return `${string.gauge}${string.type || ''}`;
};
