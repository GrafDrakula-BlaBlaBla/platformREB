import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import InfoIcon from '@material-ui/icons/Info';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {Notify, NOTIFY_TYPE} from '../../../../Common/SimpleComponents/Notify';
import {DialogRequestRevisionForm} from '../../../../Components/Forms/Accreditation/DialogRequestRevisionForm';
import './index.less';

interface IDialogRequestRevisionProps {
  isOpenDialog: boolean;
  handlerCloseDialog: () => void;
}

export const DialogRequestRevision: FC<IDialogRequestRevisionProps> = observer(
  ({isOpenDialog, handlerCloseDialog}) => {
    const handlerDialogRequestRevision = () => {
      //TODO: Согласовать обработчик "Отправить заявление на доработку" с бэком
      //TODO: Вызвать метод revision вьюмодели аккредитации
    };

    return (
      <ModalPage
        className="accreditation-revision-modal"
        onClose={handlerCloseDialog}
        isOpen={isOpenDialog}
        loading={false}
        header={{title: 'Укажите причину возврата заявления'}}
        footerButtonConfig={[
          {
            children: 'Отмена',
            whiteTheme: true,
            onClick: handlerCloseDialog,
          },
          {
            children: 'Вернуть на доработку',
            whiteTheme: false,
            onClick: handlerDialogRequestRevision,
          },
        ]}
      >
        <Notify
          icon={<InfoIcon />}
          type={NOTIFY_TYPE.warning}
          text="Необходимо выбрать причину возврата заявления на доработку"
        />
        <DialogRequestRevisionForm />
      </ModalPage>
    );
  }
);
