import React, {useEffect, useState} from 'react';
import {NewMenuItem} from './MenuListItem';
import useMenuConfig from '../../../hooks/useMenuConfig';
import {DialogSupportInfo} from '../../Dialogs/DialogSupportInfo';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {IMenuViewModel} from '../../../../ViewModel/viewModels/Menu/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {ReactComponent as SupportIcon} from '../../../../assets/svg/menu/Support.svg';
import './index.less';

interface IProps {
  segment: string;
  isOpen?: boolean;
}

export const MainMenu = observer(({segment, isOpen}: IProps) => {
  const menuConfig = useMenuConfig();

  const {menuHierarchy, setMenuConfig} = useViewModel<IMenuViewModel>(
    VIEW_MODEL.Menu
  );

  useEffect(() => {
    setMenuConfig(menuConfig);
    // eslint-disable-next-line
  }, []);

  const [isOpenDialogSupportInfo, setIsOpenDialogSupportInfo] = useState<
    boolean
  >(false);

  const handlerOpenDialogSupportInfo = () => {
    setIsOpenDialogSupportInfo(!isOpenDialogSupportInfo);
  };

  return (
    <div className={`MainMenu ${isOpen ? 'MainMenu_show' : ''}`}>
      {Array.from(menuHierarchy).map(([_, item]) => {
        const mapPath = Boolean(
          item.nestedPaths && item.nestedPaths.indexOf(segment) > -1
        );
        return (
          <NewMenuItem
            key={item.id}
            {...item}
            active={item.path.split('.')[0] === segment || mapPath}
          />
        );
      })}
      <div
        className="MainMenu-Item ItemSupportInfo"
        onClick={() => setIsOpenDialogSupportInfo(!isOpenDialogSupportInfo)}
      >
        <div className="MainMenu-Link">
          <div className="Link-Logo">
            <SupportIcon className="IconSupportInfo" />
          </div>
          <div className="Link-Text">Служба поддержки</div>
        </div>
      </div>
      <DialogSupportInfo
        openDialog={isOpenDialogSupportInfo}
        handlerCloseDialog={handlerOpenDialogSupportInfo}
      />
    </div>
  );
});
