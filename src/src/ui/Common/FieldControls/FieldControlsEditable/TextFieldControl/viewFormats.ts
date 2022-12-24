import numeral from 'numeral';

export const percentViewFormat = (value?: string | number | undefined) => {
  return `${numeral(value).format('0,0')} %`;
};
export const monthViewFormat = (value?: string | number | undefined) => {
  return `${value} мес.`;
};
