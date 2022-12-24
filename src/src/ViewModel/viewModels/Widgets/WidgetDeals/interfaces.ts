import {Params} from 'router5/dist/types/base';
import {IBaseViewModel} from '../../Base/interfaces';
import {
  IWidgetDealsSourceData,
  IWidgetDealsPieChartItem,
  IWidgetDealsSegmentItem,
  TWidgetDealsPieChartFieldName,
} from '../../../../Model/Widgets/WidgetDeals';

export interface IWidgetDealsViewModel extends IBaseViewModel {
  data: IWidgetDealsSourceData;
  filters: TWidgetDealFilters;
  dimension: TWidgetDealsPieChartFieldName;

  dataPieChart: IWidgetDealsPieChartItem[];
  dataPieChartTotalCount: number;
  dataPieChartTotalAmount: number;
  dataCategories: IWidgetDealsSegmentItem[];
  dataBanks: IWidgetDealsSegmentItem[];

  load(params: Params): Promise<void>;

  setVisible(type: string, key: string, value: boolean): void;
  toggleVisible(type: string, key: string): void;
  isVisible(type: string, key: string): boolean;
  setDimension(value: TWidgetDealsPieChartFieldName): void;
}

export type TWidgetDealFilterType = 'categories' | 'statuses' | 'banks';
export type TWidgetDealFilterItem = Record<string, boolean>;
export type TWidgetDealFilters = Record<
  TWidgetDealFilterType,
  TWidgetDealFilterItem
>;
