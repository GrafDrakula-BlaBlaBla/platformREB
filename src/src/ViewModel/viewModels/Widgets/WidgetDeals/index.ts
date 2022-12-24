import {inject, injectable} from 'inversify';
import {action, computed, makeObservable, observable} from 'mobx';
import {Params} from 'router5/dist/types/base';
import {SERVICE} from '../../../../BusinessLayer/identifiers';
import {IWidgetDealsService} from '../../../../BusinessLayer/services/Widgets/WidgetDeals/interfaces';
import {
  IWidgetDealsSourceData,
  TWidgetDealsPieChartFieldName,
} from '../../../../Model/Widgets/WidgetDeals';
import {BaseViewModel} from '../../Base';
import {
  IWidgetDealsViewModel,
  TWidgetDealFilters,
  TWidgetDealFilterType,
} from './interfaces';

@injectable()
export class WidgetDealsViewModel
  extends BaseViewModel
  implements IWidgetDealsViewModel {
  @inject(SERVICE.WidgetDeals) protected service!: IWidgetDealsService;

  public data: IWidgetDealsSourceData = {categories: []};
  public filters: TWidgetDealFilters = {
    categories: {},
    statuses: {},
    banks: {},
  };
  public dimension: TWidgetDealsPieChartFieldName = 'count';

  constructor() {
    super();
    makeObservable(this, {
      data: observable,
      filters: observable,

      dataPieChart: computed,
      dataPieChartTotalCount: computed,
      dataPieChartTotalAmount: computed,
      dataCategories: computed,
      dataBanks: computed,

      setData: action,
      load: action,
      loadFilters: action,

      setVisible: action,
      toggleVisible: action,
      isVisible: action,

      dimension: observable,
      setDimension: action,
    });
  }

  get dataPieChart() {
    const data: any[] = [];
    this.data?.categories.forEach((category) => {
      category.sectors.forEach((status) => {
        let item = data.find((d) => d.name === status.statusCode);
        if (!item) {
          item = {
            title: status.statusTitle,
            name: status.statusCode,
            count: 0,
            amount: 0,
            visible: this.filters.statuses[status.statusCode],
            color: status.color,
          };
          data.push(item);
        }
        status.tearbanks.forEach((bank) => {
          if (
            this.filters.categories[category.individualCategoryCode] &&
            this.filters.banks[bank.tb]
          ) {
            item.count += Number(bank.count);
            item.amount += Number(bank.amount);
          }
        });
      });
    });
    return data;
  }
  get dataPieChartTotalCount() {
    return this.dataPieChart.reduce((prev, curr) => {
      return prev + Number(curr.count);
    }, 0);
  }
  get dataPieChartTotalAmount() {
    return this.dataPieChart.reduce((prev, curr) => {
      return prev + Number(curr.amount);
    }, 0);
  }
  get dataCategories() {
    const data: any[] = [];
    this.data?.categories.forEach((category) => {
      let item = data.find((d) => d.name === category.individualCategoryCode);
      if (!item) {
        item = {
          title: category.individualCategoryTitle,
          name: category.individualCategoryCode,
          count: 0,
          amount: 0,
          visible: this.filters.categories[category.individualCategoryCode],
        };
        data.push(item);
      }
      category.sectors.forEach((status) => {
        status.tearbanks.forEach((bank) => {
          if (
            this.filters.statuses[status.statusCode] &&
            this.filters.banks[bank.tb]
          ) {
            item.count += Number(bank.count);
            item.amount += Number(bank.amount);
          }
        });
      });
    });
    return data;
  }
  get dataBanks() {
    const data: any[] = [];
    this.data?.categories.forEach((category) => {
      category.sectors.forEach((status) => {
        status.tearbanks.forEach((bank) => {
          let item = data.find((d) => d.name === bank.tb);
          if (!item) {
            item = {
              title: bank.tb,
              name: bank.tb,
              count: 0,
              amount: 0,
              visible: this.filters.banks[bank.tb],
            };
            data.push(item);
          }
          if (
            this.filters.categories[category.individualCategoryCode] &&
            this.filters.statuses[status.statusCode]
          ) {
            item.count += Number(bank.count);
            item.amount += Number(bank.amount);
          }
        });
      });
    });
    return data;
  }

  setData = (data: IWidgetDealsSourceData) => {
    this.data = data;
  };
  load = async (params: Params) => {
    this.setLoading();
    try {
      const data = await this.service.getSource(params);
      this.setData(data);
      this.loadFilters();
    } finally {
      this.unsetLoading();
    }
  };
  loadFilters = () => {
    this.data?.categories.forEach((category) => {
      if (!this.filters.categories[category.individualCategoryCode])
        this.filters.categories[category.individualCategoryCode] = true;
      category.sectors.forEach((sector) => {
        if (!this.filters.statuses[sector.statusCode])
          this.filters.statuses[sector.statusCode] = true;
        sector.tearbanks.forEach((bank) => {
          if (!this.filters.banks[bank.tb]) this.filters.banks[bank.tb] = true;
        });
      });
    });
  };

  setVisible = (type: TWidgetDealFilterType, key: string, value: boolean) => {
    this.filters[type][key] = value;
  };
  toggleVisible = (type: TWidgetDealFilterType, key: string) => {
    this.filters[type][key] = !this.filters[type][key];
  };
  isVisible = (type: TWidgetDealFilterType, key: string) => {
    return this.filters[type][key];
  };

  setDimension = (value: TWidgetDealsPieChartFieldName) => {
    this.dimension = value;
  };
}
