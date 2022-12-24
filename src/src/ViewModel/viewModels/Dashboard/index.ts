import {action, makeObservable, observable} from 'mobx';
import {ReactGridLayoutProps, Layout} from 'react-grid-layout';
import {IDashboardViewModel} from './interfaces';
import {
  IDashboardItemDTO,
  IWidgetSettingsDTO,
  TWidgetSettingName,
} from '../../../Model/Dashboard';
import {WIDGETS_PAGE_STATISTICS} from '../../../Model/Dashboard/mock';
import {WIDGET_SETTINGS} from '../../../Model/Widgets';
import {injectable} from 'inversify';

@injectable()
export class DashboardViewModel implements IDashboardViewModel {
  constructor() {
    makeObservable(this, {
      settingsKey: observable,
      isEdit: observable,
      items: observable,
      layoutProps: observable,

      getItems: action,
      saveItems: action,

      setItems: action,
      setIsEdit: action,
      setSettingsKey: action,
      setLayoutProps: action,
      setItemIsVisible: action,

      onLayoutChange: action,
    });
  }

  settingsKey?: TWidgetSettingName;
  isEdit: boolean = false;
  items?: IDashboardItemDTO[];
  layoutProps: ReactGridLayoutProps = {
    cols: 1,
    rowHeight: 50,
    draggableHandle: '.dashboard-widget',
    isDraggable: false,
    isResizable: false,
    margin: [12, 12],
    containerPadding: [0, 0],
  };

  getItems = () => {
    if (this.settingsKey) {
      this.setItems(
        this.mapWidgetSettingsToDashboardItem(
          WIDGETS_PAGE_STATISTICS[this.settingsKey]
        )
      );
    }
  };

  saveItems = () => {
    if (this.settingsKey && this.items) {
      console.log(
        'saveItems',
        this.mapDashboardItemToWidgetSettings(this.items)
      );
    }
  };

  setItems = (items?: IDashboardItemDTO[]) => {
    this.items = items;
  };
  setIsEdit = (value: boolean) => {
    this.isEdit = value;
    this.setLayoutProps({...this.layoutProps, isDraggable: value});
  };
  setSettingsKey = (key: TWidgetSettingName) => {
    this.settingsKey = key;
  };
  setLayoutProps = (layoutProps: ReactGridLayoutProps) => {
    this.layoutProps = layoutProps;
  };
  setItemIsVisible = (i: string, value: boolean) => {
    const newItems = this.items?.map((item) => {
      if (item.i === i) item.isVisible = value;
      return item;
    });
    this.setItems(newItems);
  };

  mapWidgetSettingsToDashboardItem = (
    items: IWidgetSettingsDTO[]
  ): IDashboardItemDTO[] => {
    let yPosition = 0;
    return items.map((item, index, arr) => {
      const widgetSettings = WIDGET_SETTINGS[item.widget]
        ? WIDGET_SETTINGS[item.widget]
        : WIDGET_SETTINGS.Default;
      const height = widgetSettings.height;
      if (index > 0) yPosition += height;
      return {
        ...item,
        i: index.toString(),
        title: widgetSettings.title,
        coordinates: {
          w: 1,
          h: height,
          x: 0,
          y: yPosition,
        },
      };
    });
  };
  mapLayoutToDashboardItem = (layout: Layout[]): IDashboardItemDTO[] => {
    return this.items
      ? this.items.map((item) => {
          const layoutItem = layout.find(
            (_item) => _item.i === item.i
          ) as Layout;
          return layoutItem
            ? ({
                ...item,
                i: layoutItem.i,
                coordinates: {
                  w: layoutItem.w,
                  h: layoutItem.h,
                  x: layoutItem.x,
                  y: layoutItem.y,
                },
              } as IDashboardItemDTO)
            : item;
        })
      : [];
  };
  mapDashboardItemToWidgetSettings = (
    items: IDashboardItemDTO[]
  ): IWidgetSettingsDTO[] => {
    return items
      ?.sort((a, b) => a.coordinates.y - b.coordinates.y)
      .map((item, index) => {
        const {i, coordinates, ...itemToSave} = item;
        itemToSave.position = index;
        return itemToSave;
      });
  };

  onLayoutChange = (layout: Layout[]) => {
    this.setItems(this.mapLayoutToDashboardItem(layout));
    window.dispatchEvent(new Event('resize'));
  };
}
