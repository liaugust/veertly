export const updateSearchParams = (params: {
  [key: string]: string | number;
}) => {
  window.history.replaceState(
    null,
    '',
    `?${Object.keys(params)
      .map((param) => `${param}=${params[param]}`)
      .join('&')}`,
  );
};
