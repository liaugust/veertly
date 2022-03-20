export const getSearchParams = (): { [key: string]: string } =>
  Object.fromEntries(new URLSearchParams(window.location.search).entries());
