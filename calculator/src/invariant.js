// @flow

export default (condition: any, message: string) => {
  if (!condition) {
    throw message;
  }
};
