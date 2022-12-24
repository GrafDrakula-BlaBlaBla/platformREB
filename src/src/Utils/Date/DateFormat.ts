import moment from 'moment';

export const getDateWithFrontEndFormat = (date: any) =>
  date ? moment(date).format('DD.MM.YYYY') : undefined;

export const convertStringToDate = (
  dateStringFormat: string
): Date | undefined => {
  return dateStringFormat
    ? moment(dateStringFormat, 'DD.MM.YYYY').toDate()
    : undefined;
};

export const formatDateString = (
  dateString?: string,
  format?: string
): string => {
  return dateString
    ? moment(dateString, ['DD.MM.YYYY HH:mm', moment.ISO_8601]).format(format)
    : 'дата не указана';
};
