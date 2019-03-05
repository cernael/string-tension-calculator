export const isGoogleBot = () => {
  return (window.navigator.userAgent || '').match(/googlebot/gim);
};
