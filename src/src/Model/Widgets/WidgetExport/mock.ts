import {IWidgetExportAreaItem, IWidgetExportSource} from './index';
import moment from 'moment';

const RANDOM_AMOUNT = () => {
  const max = 100000000;
  const min = 100000;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const WIDGET_EXPORT_MOCK: IWidgetExportSource = {
  fix: Array.apply(null, Array(moment().quarter() - 1)).map(function (_, i) {
    return {
      period: `${moment()
        .quarter(i + 1)
        .startOf('quarter')
        .format('DD.MM.YYYY')}-${moment()
        .quarter(i + 1)
        .endOf('quarter')
        .format('DD.MM.YYYY')}`,
      amount: RANDOM_AMOUNT(),
      name: `q${i + 1}`,
    };
  }),
  planning: {
    amount: RANDOM_AMOUNT(),
    date: '',
  },
};

export const WIDGET_EXPORT_FIX: IWidgetExportAreaItem[] = [
  {
    value: 0,
    time: moment().quarter(1).startOf('quarter').valueOf(),
  },
  {
    value: 100000000,
    time: moment().quarter(1).endOf('quarter').valueOf(),
  },
  {
    value: 75000000,
    time: moment().quarter(2).endOf('quarter').valueOf(),
  },
  {
    value: 200000000,
    time: moment().quarter(3).endOf('quarter').valueOf(),
  },
];
export const WIDGET_EXPORT_PLAN: IWidgetExportAreaItem[] = [
  {
    value: 200000000,
    time: moment().quarter(3).endOf('quarter').valueOf(),
  },
  {
    value: 125000000,
    time: moment().valueOf(),
  },
];
