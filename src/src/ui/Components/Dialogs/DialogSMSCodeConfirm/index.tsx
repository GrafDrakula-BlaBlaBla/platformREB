import React from 'react';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import {FormProvider, FieldValues, useForm} from 'react-hook-form';
import {UserSMSCodeConfirm, UserSMSCodeConfirmDefaultValues} from '../../Forms';
import {LoaderWithBackdrop} from '../../../Common/SimpleComponents/LoaderWithBackdrop';
import './index.less';

interface IDialogSMSCodeConfirmProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onValidate: (code: string) => Promise<boolean>;
}

export const DialogSMSCodeConfirm = ({
  isOpen,
  isLoading,
  onClose,
  onValidate,
}: IDialogSMSCodeConfirmProps) => {
  const methods = useForm<FieldValues>({
    defaultValues: UserSMSCodeConfirmDefaultValues,
    mode: 'onChange',
  });

  return (
    <ModalPage
      className="dialog-sms-code-confirm"
      onClose={onClose}
      isOpen={isOpen}
      header={{title: 'Аутентификация пользователя'}}
    >
      <LoaderWithBackdrop loading={isLoading} />
      <FormProvider {...methods}>
        <UserSMSCodeConfirm onValidate={onValidate} />
      </FormProvider>
    </ModalPage>
  );
};
