export interface IWidgetSettings {
  [key: string]: {
    title: string;
    height: number;
  };
}

/** IWidgetSettings
 * [key: string]: {
 *  title: string; - заголовок виджета
 *  height: number; - высота виджета в единицах, одна единица равна n-px, значение n указано во вьюмодели дэшборда (DashboardViewModel)
 * }
 **/

export const WIDGET_SETTINGS: IWidgetSettings = {
  Default: {
    title: 'Виджет',
    height: 9,
  },
  WidgetDeals: {
    title: 'Сделки',
    height: 10,
  },
  WidgetIndustry: {
    title: 'Отраслевое разделение',
    height: 13,
  },
  WidgetCountries: {
    title: 'Страна поставки экспорта',
    height: 12,
  },
  WidgetCredit: {
    title: 'Кредитная линия и аккредитив',
    height: 10,
  },
  WidgetExport: {
    title: 'Подтвержденный объем экспорта, ₽',
    height: 8,
  },
};
