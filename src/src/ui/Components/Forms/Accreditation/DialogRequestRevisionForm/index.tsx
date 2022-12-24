import React, {FC} from 'react';
import {
  CheckboxFieldControl,
  TextFieldControl,
} from '../../../../Common/FieldControls';
import {Form, FormField} from '../../../../Common/FormComponents';
import './index.less';

interface IDialogRequestRevisionFormProps {}

export const DialogRequestRevisionForm: FC<IDialogRequestRevisionFormProps> = () => {
  return (
    <Form className="dialog-revision-form">
      <FormField title="Причина возврата заявления">
        <CheckboxFieldControl label="Предоставлен не актуальный документ(ы)" />
        <CheckboxFieldControl label="Не хватает документов" />
        <CheckboxFieldControl label="Вопрос о содержании документов" />
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
