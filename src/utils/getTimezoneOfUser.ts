import express from 'express';

// eslint-disable-next-line
export const getTimezoneOfUser = (req: express.Request): string => {
  // it is a mock function to return static timezone name
  // a real implementation may get User timezone from IP address, users language,
  // from some content info or some custom http header which is given by client application
  return 'europe/istanbul';
};
