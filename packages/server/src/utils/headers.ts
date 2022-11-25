export const getOriginFromHeaders = (headers) => {
  if (headers['x-forwarded-host']) {
    return `${headers['x-forwarded-proto']}://${headers['x-forwarded-host']}`;
  }

  return headers.origin;
};
