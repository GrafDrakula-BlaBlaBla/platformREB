import React, {ChangeEvent, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {LoaderWithBackdrop} from '../../../Common/SimpleComponents/LoaderWithBackdrop';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import {FormField} from '../../../Common/FormComponents';
import {TextFieldControl} from '../../../Common/FieldControls';
import './index.less';

interface IDialogReasonProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (value?: string, name?: string) => void;
  loading?: boolean;
  fieldName?: string;
}

export const DialogReason = observer((props: IDialogReasonProps) => {
  const {isOpen, onClose, onSuccess, loading, fieldName} = props;

  const [state, setState] = useState<string | undefined>();
  const onChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState(e.target.value);
  };

  const onSubmit = async () => {
    if (onSuccess) await onSuccess(state?.trim(), fieldName);
    if (onClose) onClose();
  };

  return (
    <ModalPage
      className="dialog-reason"
      onClose={onClose}
      isOpen={isOpen}
      header={{title: 'Причины доработки'}}
      footerButtonConfig={[
        {
          children: 'Отмена',
          variant: 'outlined',
          color: 'default',
          onClick: onClose,
        },
        {
          children: 'Вернуть на доработку',
          variant: 'contained',
          color: 'blue',
          onClick: onSubmit,
        },
      ]}
    >
      <FormField title="Сообщение (не обязательно для заполнения)">
        <TextFieldControl
          placeholder="Текст коммментария"
          multiline
          rows={5}
          name={fieldName}
          value={state}
          onChange={onChangeHandler}
        />
      </FormField>
      <LoaderWithBackdrop loading={loading} />
    </ModalPage>
  );
});
