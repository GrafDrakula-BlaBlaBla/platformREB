import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  MultiSelectFieldControl,
  MultiSelectFieldControlEditable,
  MultiSelectFieldControlUseForm,
} from '../../Common/FieldControls';

const SelectList = [
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

export const MultiSelectFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<unknown[]>();

  return (
    <FormSection title="MultiSelectField">
      <FormField
        title="1. MultiSelectFieldControl"
        info="Зависит от @material-ui/core"
      >
        <MultiSelectFieldControl
          label="Заголовок"
          onChange={(e, child) => {
            console.log(e.target.value, child);
          }}
          items={SelectList}
        />
        <MultiSelectFieldControl
          error={true}
          helperText="Ошибка"
          items={SelectList}
          value={[1, 2]}
        />
        <MultiSelectFieldControl items={SelectList} value={[1]} />
      </FormField>
      <FormField
        title="2. MultiSelectFieldControlEditable"
        info="Зависит от MultiSelectFieldControl"
      >
        <MultiSelectFieldControlEditable
          label="Заголовок"
          value={value}
          items={SelectList}
          onChange={(e, child) => {
            setValue(e.target.value as unknown[]);
          }}
        />
        <MultiSelectFieldControlEditable
          error={true}
          helperText="Ошибка"
          items={SelectList}
          value={[2]}
        />
        <MultiSelectFieldControlEditable
          isEdit={false}
          items={SelectList}
          value={value}
        />
      </FormField>
      <FormField
        title="3. MultiSelectFieldControlUseForm"
        info="Зависит от MultiSelectFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <MultiSelectFieldControlUseForm
            label="Заголовок"
            name="noValidation"
            items={SelectList}
          />
          <MultiSelectFieldControlUseForm
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
