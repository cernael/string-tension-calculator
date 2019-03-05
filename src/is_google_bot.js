export const isGoogleBot = () => {
  (window.navigator.userAgent || '').match(/googlebot/gim);
};
