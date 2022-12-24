import React, {FC} from 'react';
import {
  CheckboxFieldControl,
  TextFieldControl,
} from '../../../../Common/FieldControls';
import {Form, FormField} from '../../../../Common/FormComponents';
import './index.less';

interface IDialogRequestRejectedFormProps {}

export const DialogRequestRejectedForm: FC<IDialogRequestRejectedFormProps> = () => {
  return (
    <Form className="dialog-rejected-form">
      <FormField title="Причина отклонения заявления">
        <CheckboxFieldControl label="Некорректно заполненное заявление" />
        <CheckboxFieldControl label="Проблемы с финансовой отчетностью" />
        <CheckboxFieldControl label="Отказ в сотрудничестве" />
        <CheckboxFieldControl label="Другое" />
      </FormField>
      <FormField title="Комментарий">
        <TextFieldControl
          placeholder="введите текст вашего комментария"
          rows={4}
          multiline={true}
        />
      </FormField>
    </Form>
  );
};
