import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import InfoIcon from '@material-ui/icons/Info';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {Notify, NOTIFY_TYPE} from '../../../../Common/SimpleComponents/Notify';
import {DialogRequestRejectedForm} from '../../../../Components/Forms/Accreditation/DialogRequestRejectedForm';
import './index.less';

interface IDialogRequestRejectedProps {
  isOpenDialog: boolean;
  handlerCloseDialog: () => void;
}

export const DialogRequestRejected: FC<IDialogRequestRejectedProps> = observer(
  ({isOpenDialog, handlerCloseDialog}) => {
    const handlerDialogRequestRejected = () => {
      //TODO: Согласовать обработчик "Отклонить заявление" с бэком
      //TODO: Вызвать метод reject вьюмодели аккредитации
    };

    return (
      <ModalPage
        className="accreditation-rejected-modal"
        onClose={handlerCloseDialog}
        isOpen={isOpenDialog}
        loading={false}
        header={{title: 'Укажите причину отклонения заявления'}}
        footerButtonConfig={[
          {
            children: 'Отмена',
            whiteTheme: true,
            onClick: handlerCloseDialog,
          },
          {
            children: 'Отклонить',
            variant: 'outlined',
            color: 'red',
            onClick: handlerDialogRequestRejected,
          },
        ]}
      >
        <Notify
          icon={<InfoIcon />}
          type={NOTIFY_TYPE.warning}
          text="Необходимо выбрать причину отклонения заявления"
        />
        <DialogRequestRejectedForm />
      </ModalPage>
    );
  }
);
