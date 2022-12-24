export interface IWidgetExportSource {
  fix: IWidgetExportSourceFixItem[];
  planning: IWidgetExportSourcePlanItem;
}
export interface IWidgetExportSourceFixItem {
  period: string;
  amount: number;
  name: string;
}
export interface IWidgetExportSourcePlanItem {
  amount: number;
  date: string;
}

export interface IWidgetExportAreaItem {
  value: number;
  time: number;
}
