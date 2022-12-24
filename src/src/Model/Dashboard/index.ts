export interface IWidgetSettingsDTO {
  widget: string;
  position: number;
  isVisible: boolean;
}

export interface IDashboardItemDTO extends IWidgetSettingsDTO {
  i: string;
  title: string;
  coordinates: {
    w: number;
    h: number;
    x: number;
    y: number;
  };
}

export type TWidgetSettingName = 'WidgetsCom' | 'WidgetsReb';
