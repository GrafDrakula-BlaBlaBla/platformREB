import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  SMSCodeFieldControl,
  SMSCodeFieldControlEditable,
  SMSCodeFieldControlUseForm,
} from '../../Common/FieldControls';
import {DialogSMSCodeConfirm} from '../Dialogs/DialogSMSCodeConfirm';

export const SMSCodeFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <FormSection title="SMSCodeField">
      <FormField
        title="1. SMSCodeFieldControl"
        info="Зависит от @material-ui/core"
      >
        <SMSCodeFieldControl
          name="sms"
          onChange={(array, value, name) => {
            console.log(array, value, name);
          }}
        />
        <SMSCodeFieldControl error={true} helperText="Ошибка" />
        <SMSCodeFieldControl maxLength={6} value="666" />
      </FormField>
      <FormField
        title="2. SMSCodeFieldControlEditable"
        info="Зависит от SMSCodeFieldControl"
      >
        <SMSCodeFieldControlEditable
          value={value}
          onChange={(arr, value, name) => setValue(value)}
        />
        <SMSCodeFieldControlEditable
          error={true}
          helperText="Ошибка"
          value="666"
        />
        <SMSCodeFieldControlEditable isEdit={false} value={value} />
      </FormField>
      <FormField
        title="3. SMSCodeFieldControlUseForm"
        info="Зависит от SMSCodeFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <SMSCodeFieldControlUseForm name="noValidation" maxLength={5} />
          <SMSCodeFieldControlUseForm
            name="email"
            rules={{
              required: 'Поле обязательно для заполнения',
              validate: {
                isValid: (value) => {
                  return (
                    value === '5555' || 'Не верное значение. Должно быть 5555'
                  );
                },
              },
            }}
            onChange={(arr, value, name) => {}}
          />
          <DialogSMSCodeConfirm
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onValidate={(code) => Promise.resolve(true)}
          />
          <Button
            onClick={methods.handleSubmit(submit)}
            className="field-control"
          >
            Подтвердить
          </Button>
          <Button onClick={() => setIsOpen(true)} className="field-control">
            Диалог ввода кода
          </Button>
        </FormProvider>
      </FormField>
    </FormSection>
  );
};
