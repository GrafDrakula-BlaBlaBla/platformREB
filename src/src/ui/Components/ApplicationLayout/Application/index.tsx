import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import useRouteSegment from '../../../hooks/useRouteSegment';
import useViewModel from '../../../hooks/useViewModel';
import {useWindowResize} from '../../../hooks/useWindowResize';
import {MainLayout} from '../MainLayout';
import {Header} from '../Header';
import {MainMenu} from '../MainMenu';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IMenuViewModel} from '../../../../ViewModel/viewModels/Menu/interfaces';
import './index.less';

export const Application: FC = observer(
  ({children}): JSX.Element => {
    const {isOpen, closeMenu, openMenu} = useViewModel<IMenuViewModel>(
      VIEW_MODEL.Menu
    );
    const segment = useRouteSegment();
    const windowSize = useWindowResize();

    let headerProps;
    let mainMenuProps: any = {segment};

    switch (windowSize) {
      case 'small':
        headerProps = {
          showMenuButton: isOpen,
          setOpenMenu: (isOpen: boolean) => (isOpen ? openMenu() : closeMenu()),
        };
        mainMenuProps = {...mainMenuProps, isOpen, closeMenu};
        break;
      default:
        break;
    }

    return (
      <>
        <Header {...headerProps} />
        <div className="application">
          <MainMenu {...mainMenuProps} />
          <MainLayout onClick={closeMenu}>{children}</MainLayout>
        </div>
      </>
    );
  }
);
