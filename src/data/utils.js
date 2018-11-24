// @flow

export const roundTo = (number: number, digits: number) => {
  return Math.floor(number * Math.pow(10, digits)) / Math.pow(10, digits);
};
