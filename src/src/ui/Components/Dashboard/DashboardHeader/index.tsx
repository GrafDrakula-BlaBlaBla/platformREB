import React from 'react';
import {Button} from '../../../Common/SimpleComponents/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';
import useViewModel from '../../../hooks/useViewModel';
import {IDashboardViewModel} from '../../../../ViewModel/viewModels/Dashboard/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';
import './index.less';

export interface IDashboardHeaderProps {
  title: string;
}

export const DashboardHeader = observer((props: IDashboardHeaderProps) => {
  const {title} = props;
  const {isEdit, setIsEdit, saveItems, getItems} = useViewModel<
    IDashboardViewModel
  >(VIEW_MODEL.Dashboard);

  const onEdit = () => {
    setIsEdit(true);
  };
  const onCancel = () => {
    setIsEdit(false);
    getItems();
  };
  const onSave = () => {
    saveItems();
    setIsEdit(false);
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-header__title">{title}</div>
      <div className="dashboard-header__buttons">
        {isEdit ? (
          <React.Fragment>
            <Button variant="outlined" color="red" onClick={onCancel}>
              Отменить
            </Button>
            <Button
              variant="outlined"
              color="default"
              startIcon={<CheckIcon />}
              onClick={onSave}
            >
              Применить
            </Button>
          </React.Fragment>
        ) : (
          <Button
            variant="outlined"
            color="default"
            startIcon={<SettingsIcon style={{color: '#C5CAD0'}} />}
            onClick={onEdit}
            iconButton
          />
        )}
        <Button
          variant="contained"
          color="blue"
          startIcon={<GetAppIcon />}
          className="btn__backward"
          style={{display: 'none'}}
        >
          Экспорт в PDF
        </Button>
      </div>
    </div>
  );
});
