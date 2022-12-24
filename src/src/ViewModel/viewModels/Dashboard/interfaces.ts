import {ReactGridLayoutProps, Layout} from 'react-grid-layout';
import {IDashboardItemDTO} from '../../../Model/Dashboard';

export interface IDashboardViewModel {
  settingsKey?: string;
  isEdit: boolean;
  items?: IDashboardItemDTO[];
  layoutProps: ReactGridLayoutProps;

  getItems(): void;
  saveItems(): void;

  setItems(): void;
  setSettingsKey(id: string): void;
  setIsEdit(value: boolean): void;
  setItemIsVisible(i: string, value: boolean): void;

  onLayoutChange(layout: Layout[]): void;
}
