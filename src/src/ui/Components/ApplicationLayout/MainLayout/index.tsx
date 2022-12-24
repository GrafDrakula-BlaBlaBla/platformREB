import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import useDiContainer from '../../../hooks/useDiContainer';
import useViewModel from '../../../hooks/useViewModel';
import moment from 'moment';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {ERROR_MODULE} from '../../../../ErrorsLayer/containers/errorModuleContainer';
import {IErrorsModule} from '../../../../ErrorsLayer/ErrorsModule/interfaces';
import {IAppViewModel} from '../../../../ViewModel/viewModels/App/interfaces';
import './index.less';

interface IProps {
  onClick: () => void;
}

/**
 * Компонент обертки над страницей внутри рабочей области приложения.
 */
export const MainLayout: FC<IProps> = observer(({onClick, children}) => {
  const {error, deleteError} = useDiContainer().get<IErrorsModule>(
    ERROR_MODULE
  );

  const {sendNotification} = useViewModel<IAppViewModel>(VIEW_MODEL.App);

  if (error) {
    sendNotification({
      text: error,
      title: 'Ошибка получения данных',
      isError: true,
    });
    deleteError();
  }

  return (
    <div onClick={onClick} className="main-layout">
      <div className="main-layout__content">{children}</div>
      <div className="main-layout__signature">
        1994–{moment().year()} АО РОСЭКСИМБАНК
      </div>
    </div>
  );
});
