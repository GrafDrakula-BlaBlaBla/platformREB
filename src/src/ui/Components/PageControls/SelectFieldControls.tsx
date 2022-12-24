import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  SelectFieldControl,
  SelectFieldControlEditable,
  SelectFieldControlUseForm,
} from '../../Common/FieldControls';

const SelectList = [
  {
    label: 'Выберите значение',
    value: '',
  },
  {
    label: 'Администратор',
    value: 1,
  },
  {
    label: 'Менеджер',
    value: 2,
  },
  {
    label: 'Читатель',
    value: 3,
  },
];

export const SelectFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<unknown>();

  return (
    <FormSection title="SelectField">
      <FormField
        title="1. SelectFieldControl"
        info="Зависит от @material-ui/core"
      >
        <SelectFieldControl
          label="Заголовок"
          onChange={(e, value) => {}}
          items={SelectList}
        />
        <SelectFieldControl
          error={true}
          helperText="Ошибка"
          items={SelectList}
        />
        <SelectFieldControl items={SelectList} value={1} />
      </FormField>
      <FormField
        title="2. SelectFieldControlEditable"
        info="Зависит от SelectFieldControl"
      >
        <SelectFieldControlEditable
          label="Заголовок"
          value={value}
          items={SelectList}
          onChange={(e, child) => {
            setValue(e.target.value);
          }}
        />
        <SelectFieldControlEditable
          error={true}
          helperText="Ошибка"
          items={SelectList}
          value={2}
        />
        <SelectFieldControlEditable
          isEdit={false}
          items={SelectList}
          value={value}
        />
      </FormField>
      <FormField
        title="3. SelectFieldControlUseForm"
        info="Зависит от SelectFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <SelectFieldControlUseForm
            label="Заголовок"
            name="noValidation"
            items={SelectList}
          />
          <SelectFieldControlUseForm
            name="email"
            placeholder="Валидация required"
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
            onChange={(e) => {}}
            items={SelectList}
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
