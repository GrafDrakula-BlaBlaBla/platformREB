import React, {FC} from 'react';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import {UserSMSCodeNotReceive} from '../../Forms/User/UserSMSCodeNotReceive';
import './index.less';

interface IDialogSMSCodeNotReceiveProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export const DialogSMSCodeNotReceive: FC<IDialogSMSCodeNotReceiveProps> = ({
  isOpen,
  onClose,
}) => {
  const handleOnClose = () => {
    onClose(false);
  };

  return (
    <ModalPage
      onClose={handleOnClose}
      isOpen={isOpen}
      header={{title: 'Не приходит CМС?'}}
      className="dialog-sms-code-not-receive"
    >
      <UserSMSCodeNotReceive />
    </ModalPage>
  );
};
