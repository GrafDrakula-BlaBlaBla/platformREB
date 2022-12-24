import moment from 'moment';

export const daysOfCurrentYear = () => {
  const startOfYear = moment().startOf('year');
  const startOfYearNext = moment().add(1, 'year').startOf('year');
  return startOfYearNext.diff(startOfYear, 'days');
};
