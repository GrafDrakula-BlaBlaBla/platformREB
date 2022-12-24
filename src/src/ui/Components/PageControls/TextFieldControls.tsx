import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  NumberFieldControlFormat,
  percentViewFormat,
  TextFieldControl,
  TextFieldControlEditable,
  TextFieldControlUseForm,
} from '../../Common/FieldControls';
import {InputAdornment} from '@material-ui/core';
import {DialogReason} from '../Dialogs/DialogReason';

export const TextFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <FormSection title="TextField">
      <FormField
        title="1. TextFieldControl"
        info="Зависит от @material-ui/core"
      >
        <TextFieldControl
          label="Заголовок"
          placeholder="Поле пустое c колбэком onChange"
          onChange={(e) => {}}
        />
        <TextFieldControl
          placeholder="Поле с ошибкой"
          error={true}
          helperText="Ошибка"
          InputProps={{
            inputComponent: NumberFieldControlFormat as any,
            endAdornment: <InputAdornment position="end">дн</InputAdornment>,
          }}
        />
        <TextFieldControl
          placeholder="Поле со значением"
          value="Значение"
          multiline
          rows={5}
        />
      </FormField>
      <FormField
        title="2. TextFieldControlEditable"
        info="Зависит от TextFieldControl"
      >
        <TextFieldControlEditable
          label="Заголовок"
          placeholder="Редактируемое поле пустое"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            inputComponent: NumberFieldControlFormat as any,
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextFieldControlEditable
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <TextFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
          viewFormat={percentViewFormat}
        />
      </FormField>
      <FormField
        title="3. TextFieldControlUseForm"
        info="Зависит от TextFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <TextFieldControlUseForm
            label="Заголовок"
            name="noValidation"
            placeholder="Поле без валидации"
          />
          <TextFieldControlUseForm
            name="email"
            placeholder="Валидация email, required"
            rules={{
              required: 'Поле обязательно для заполнения',
              validate: {
                isValid: (value) => {
                  const emailRegExp = new RegExp(/.+@.+\..+/, 'i');
                  return emailRegExp.test(value) || 'Не верный формат почты';
                },
              },
            }}
            onChange={(e) => {}}
          />
          <Button
            onClick={methods.handleSubmit(submit)}
            className="field-control"
          >
            Подтвердить
          </Button>
          <DialogReason
            fieldName="reason"
            loading={false}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSuccess={(value?: string, name?: string) => {
              console.log(name, value);
              setIsOpen(false);
            }}
          />
          <Button onClick={() => setIsOpen(true)} className="field-control">
            Диалог причины доработки
          </Button>
        </FormProvider>
      </FormField>
    </FormSection>
  );
};
