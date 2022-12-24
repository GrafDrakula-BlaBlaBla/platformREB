import React from 'react';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import {ReactComponent as ErrorCrossIcon} from '../../../../assets/svg/commonArea/ErrorCross.svg';
import './index.less';

interface IDialogUserDeleteErrorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DialogUserDeleteError = ({
  isOpen,
  onClose,
}: IDialogUserDeleteErrorProps) => {
  return (
    <ModalPage
      className="dialog-user-delete-error"
      onClose={onClose}
      isOpen={isOpen}
      header={{title: ''}}
    >
      <ErrorCrossIcon />
      <div className="dialog-user-delete-error__title">
        Удаление пользователя невозможно
      </div>
      <div className="dialog-user-delete-error__message">
        Пользователь в роли администратора
        <br />
        не может самостоятельно удалить свою учетную запись.
      </div>
    </ModalPage>
  );
};
