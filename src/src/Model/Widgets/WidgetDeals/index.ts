export interface IWidgetDealsSourceData {
  categories: Array<IWidgetDealsCategory>;
}
interface IWidgetDealsCategory {
  individualCategoryCode: string;
  individualCategoryTitle: string;
  sectors: Array<IWidgetDealsStatuses>;
}
interface IWidgetDealsStatuses {
  statusCode: string;
  statusTitle: string;
  color: string;
  tearbanks: Array<IWidgetDealsTearBanks>;
}
interface IWidgetDealsTearBanks {
  tb: string;
  count: number;
  amount: number;
}

export interface IWidgetDealsPieChartItem {
  title: string;
  name: string;
  count: number;
  amount: number;
  visible: boolean;
  color: string;
}
export interface IWidgetDealsSegmentItem {
  title: string;
  name: string;
  count: number;
  amount: number;
  visible: boolean;
}

export type TWidgetDealsPieChartFieldName = 'count' | 'amount';
