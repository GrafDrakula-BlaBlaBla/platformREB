import React, {FC} from 'react';
import {Form, FormField} from '../../../Common/FormComponents';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import './index.less';

interface IDialogInfoProps {
  openDialog: boolean;
  handlerCloseDialog: () => void;
}

export const DialogSupportInfo: FC<IDialogInfoProps> = ({
  openDialog,
  handlerCloseDialog,
}) => {
  return (
    <ModalPage
      className="dialogSupportInfo"
      header={{
        title: 'Служба поддержки платформы',
      }}
      isOpen={openDialog}
      onClose={handlerCloseDialog}
    >
      <Form>
        <FormField title="Для звонков по России">
          <a href="tel:88005556336">
            8 800 555 63 36 (пон.-суб. с 00:00 до 20:00 по МСК)
          </a>
        </FormField>
        <FormField title="Электронная почта">
          <a href="mailto:support.reb@rebplatform.ru">
            support.reb@rebplatform.ru
          </a>
        </FormField>
      </Form>
    </ModalPage>
  );
};
