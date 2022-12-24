import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  PasswordFieldControl,
  PasswordFieldControlEditable,
  PasswordFieldControlUseForm,
} from '../../Common/FieldControls';

export const PasswordFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<string>('_Pa2');

  return (
    <FormSection title="PasswordField">
      <FormField
        title="1. PasswordFieldControl"
        info="Зависит от @material-ui/core, @material-ui/icons"
      >
        <PasswordFieldControl
          label="Заголовок"
          placeholder="Поле пустое c колбэком onChange"
          onChange={(e) => {}}
        />
        <PasswordFieldControl
          placeholder="Поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <PasswordFieldControl placeholder="Поле со значением" value="_Pass@" />
      </FormField>
      <FormField
        title="2. PasswordFieldControlEditable"
        info="Зависит от PasswordFieldControl"
      >
        <PasswordFieldControlEditable
          label="Заголовок"
          placeholder="Редактируемое поле пустое"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <PasswordFieldControlEditable
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <PasswordFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. PasswordFieldControlUseForm"
        info="Зависит от PasswordFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <PasswordFieldControlUseForm
            label="Заголовок"
            name="passwordNoValidation"
            placeholder="Поле без валидации"
          />
          <PasswordFieldControlUseForm
            name="passwordValidation"
            placeholder="Валидация пароля, required"
            rules={{required: 'Поле обязательно для заполнения'}}
            shouldValidate={true}
            onChange={(e) => {}}
          />
          <Button
            onClick={methods.handleSubmit(submit)}
            className="field-control"
          >
            Подтвердить
          </Button>
        </FormProvider>
      </FormField>
    </FormSection>
  );
};
