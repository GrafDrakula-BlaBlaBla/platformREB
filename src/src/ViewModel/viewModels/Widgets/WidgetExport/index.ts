import {action, computed, makeObservable, observable} from 'mobx';
import {Params} from 'router5/dist/types/base';
import {BaseViewModel} from '../../Base';
import {IWidgetExportViewModel} from './interfaces';
import {
  IWidgetExportAreaItem,
  IWidgetExportSource,
} from '../../../../Model/Widgets/WidgetExport';
import {IWidgetExportService} from '../../../../BusinessLayer/services/Widgets/WidgetExport/interfaces';
import moment from 'moment';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class WidgetExportViewModel
  extends BaseViewModel
  implements IWidgetExportViewModel {
  @inject(SERVICE.WidgetExport) protected service!: IWidgetExportService;

  constructor() {
    super();
    makeObservable(this, {
      data: observable,
      dataFix: computed,
      dataPlan: computed,
      load: action,
      setData: action,
    });
  }

  public data?: IWidgetExportSource;
  public ticks = [
    moment().quarter(1).endOf('quarter').valueOf(),
    moment().quarter(2).endOf('quarter').valueOf(),
    moment().quarter(3).endOf('quarter').valueOf(),
    moment().quarter(4).endOf('quarter').valueOf(),
  ];
  public domain = [this.ticks[0], this.ticks[4]];

  get dataFix() {
    const dataFix =
      this.data?.fix
        .map((d) => {
          const time = d.period.split('-')[1];
          const date = moment(time, 'DD.MM.YYYY').endOf('day');
          return {
            value: d.amount,
            time: date.valueOf(),
          } as IWidgetExportAreaItem;
        })
        .sort((a, b) => a.time - b.time) || [];
    const startItem: IWidgetExportAreaItem = {
      value: 0,
      time: moment().quarter(1).startOf('quarter').valueOf(),
    };
    // @todo: временное решение, убираем значения за предыдущий год
    return [startItem].concat(
      dataFix.filter((d) => moment(d.time).year() === moment().year())
    );
  }
  get dataPlan() {
    return [
      this.dataFix[this.dataFix.length - 1],
      {
        value: this.data?.planning.amount as number,
        time: new Date().valueOf(), // moment(this.data?.planning.date, 'DD.MM.YYYY').valueOf(),
      },
    ];
  }

  load = async (params: Params) => {
    this.setLoading();
    try {
      const data = await this.service.getSource(params);
      this.setData(data);
    } finally {
      this.unsetLoading();
    }
  };

  setData = (data?: IWidgetExportSource) => {
    this.data = data;
  };
}
