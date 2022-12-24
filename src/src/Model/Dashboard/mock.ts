import {IWidgetSettingsDTO, TWidgetSettingName} from './index';

export const WIDGETS_PAGE_STATISTICS: Record<
  TWidgetSettingName,
  IWidgetSettingsDTO[]
> = {
  WidgetsCom: [
    {
      widget: 'WidgetDealsCom',
      position: 0,
      isVisible: true,
    },
    {
      widget: 'WidgetIndustry',
      position: 1,
      isVisible: true,
    },
    {
      widget: 'WidgetCountries',
      position: 2,
      isVisible: true,
    },
    {
      widget: 'WidgetCredit',
      position: 3,
      isVisible: true,
    },
    {
      widget: 'WidgetExport',
      position: 4,
      isVisible: true,
    },
  ],
  WidgetsReb: [
    {
      widget: 'WidgetDealsReb',
      position: 0,
      isVisible: true,
    },
    {
      widget: 'WidgetIndustry',
      position: 1,
      isVisible: true,
    },
    {
      widget: 'WidgetCountries',
      position: 2,
      isVisible: true,
    },
    {
      widget: 'WidgetCredit',
      position: 3,
      isVisible: true,
    },
    {
      widget: 'WidgetExport',
      position: 4,
      isVisible: true,
    },
  ],
};
