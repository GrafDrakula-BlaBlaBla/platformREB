import {interfaces} from 'inversify';
import {MenuViewModel} from '..';
import {createTestDIContainer} from '../../../../testUtils/createTestDiContainer';
import {MENU_CONFIG_CB_ACTIVE} from '../../../../ui/app/settings/menuConfig/MenuConfigCBActive';
import {ROUTER_CONST_CB_ACTIVE} from '../../../../ui/app/settings/routerConst/RouterConstCBActive';
import {VIEW_MODEL} from '../../../containers/viewModelContainer';

let Container: interfaces.Container;

describe('MenuViewModel', () => {
  beforeEach(async () => {
    Container = await createTestDIContainer('commercial').then(
      (container) => container
    );
  });
  it('Проверяем открытие и закрытие меню', () => {
    const viewModel = Container.get<MenuViewModel>(VIEW_MODEL.Menu);
    expect(viewModel.isOpen).toEqual(false);
    viewModel.openMenu();
    expect(viewModel.isOpen).toEqual(true);
    viewModel.closeMenu();
    expect(viewModel.isOpen).toEqual(false);
  });
});

it('Проверяем построение иерархии меню', function () {
  const viewModel = Container.get<MenuViewModel>(VIEW_MODEL.Menu);

  viewModel.setMenuConfig(MENU_CONFIG_CB_ACTIVE);

  const menuId = 8;
  expect(viewModel.menuHierarchy.get(menuId)?.title).toEqual(
    MENU_CONFIG_CB_ACTIVE.find((menuItem) => {
      return menuItem.id === menuId;
    })?.title
  );
});

it('Поиск пункта меню по иерархии', () => {
  const {_findMenuItem, _getMenuHierarchy} = Container.get<MenuViewModel>(
    VIEW_MODEL.Menu
  );
  const menuHierarchy = _getMenuHierarchy(MENU_CONFIG_CB_ACTIVE);
  const MenuItem = _findMenuItem(menuHierarchy, 7);
  expect(MenuItem?.path).toEqual(ROUTER_CONST_CB_ACTIVE.REPORTS.name);
});
