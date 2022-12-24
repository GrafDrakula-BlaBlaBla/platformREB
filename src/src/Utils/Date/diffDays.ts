import moment from 'moment';
import {declOfNum} from '../Number/declOfNum';

const year_forms = ['год', 'года', 'лет'];
const month_forms = ['месяц', 'месяца', 'месяцев'];
const day_forms = ['день', 'дня', 'дней'];

export const diffDays = (date1: Date, date2: Date, include?: boolean) => {
  const startDate = moment(date1);
  const endDate = moment(date2);
  const _days = moment(endDate).diff(startDate, 'days') + (include ? 1 : 0);
  let _result = '';
  if (_days > 0) _result += `${_days} ${declOfNum(_days, day_forms)}`;
  return _result;
};

/**
 * не совсем корректно работает
 * если 01.02.2021 - 01.03.2021 - то мы считаем что в первом месяце 28 дней и получается 1 месяц, все верно.
 * а если 28.02.2021 - 31.03.2021 - то получается 1 месяц и 3 дня (спорный момент)
 * **/
export const diffYearsMonthsDays = (
  date1: Date,
  date2: Date,
  include?: boolean
) => {
  const startDate = moment(date1);
  const endDate = moment(date2);

  const _daysHash = {} as Record<number, Record<number, number>>;
  for (let i = startDate.year(); i <= endDate.year(); i++) {
    _daysHash[i] = {};
    if (i === startDate.year() && i === endDate.year()) {
      for (let j = startDate.month(); j <= endDate.month(); j++) {
        _daysHash[i][j] = moment({year: i, month: j}).daysInMonth();
      }
    } else if (i === startDate.year()) {
      for (let j = startDate.month(); j < 12; j++) {
        _daysHash[i][j] = moment({year: i, month: j}).daysInMonth();
      }
    } else if (i === endDate.year()) {
      for (let j = 0; j <= endDate.month(); j++) {
        _daysHash[i][j] = moment({year: i, month: j}).daysInMonth();
      }
    } else {
      for (let j = 0; j < 12; j++) {
        _daysHash[i][j] = moment({year: i, month: j}).daysInMonth();
      }
    }
  }

  const _diffDays = moment(endDate).diff(startDate, 'days') + (include ? 1 : 0);
  let _years = 0;
  let _months = 0;
  let _days = _diffDays;

  for (let year in _daysHash) {
    for (let month in _daysHash[year]) {
      if (_days >= _daysHash[year][month]) {
        _days -= _daysHash[year][month];
        _months++;
        if (_months === 12) {
          _months = 0;
          _years++;
        }
      }
    }
  }

  let _result = '';
  if (_years > 0) _result += `${_years} ${declOfNum(_years, year_forms)} `;
  if (_months > 0) _result += `${_months} ${declOfNum(_months, month_forms)} `;
  if (_days > 0) _result += `${_days} ${declOfNum(_days, day_forms)}`;

  return _result.trim();
};
