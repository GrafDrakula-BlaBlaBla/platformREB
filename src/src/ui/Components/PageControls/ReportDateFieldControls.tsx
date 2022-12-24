import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  ReportDateFieldControl,
  ReportDateFieldControlEditable,
  ReportDateFieldControlUseForm,
  IReportDateValue,
} from '../../Common/FieldControls';

export const ReportDateFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<IReportDateValue>();

  return (
    <FormSection title="ReportDateField">
      <FormField
        title="1. ReportDateFieldControl"
        info="Зависит от @material-ui/pickers, DateFieldControl, CalendarIcon, date-fns"
      >
        <ReportDateFieldControl
          label="Заголовок"
          placeholder="Поле пустое c колбэком onChange"
          onChange={(value) => {
            console.log(value);
          }}
        />
        <ReportDateFieldControl
          placeholder="Поле с ошибкой"
          error={true}
          helperText="Ошибка"
          onChange={(value) => {}}
        />
        <ReportDateFieldControl
          placeholder="Поле со значением"
          value={{quarter: '1-2', year: {start: 2022, end: 2024}}}
          onChange={(value) => {}}
        />
      </FormField>
      <FormField
        title="2. ReportDateFieldControlEditable"
        info="Зависит от ReportDateFieldControl"
      >
        <ReportDateFieldControlEditable
          placeholder="Редактируемое поле пустое"
          value={value}
          onChange={(value) => setValue(value)}
        />
        <ReportDateFieldControlEditable
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
          onChange={(value) => {}}
        />
        <ReportDateFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
          onChange={(value) => {}}
        />
      </FormField>
      <FormField
        title="3. ReportDateFieldControlUseForm"
        info="Зависит от ReportDateFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <ReportDateFieldControlUseForm
            name="q1"
            isEdit={true}
            placeholder="Поле без валидации"
            onChange={(value) => {
              console.log(value);
            }}
          />
          <ReportDateFieldControlUseForm
            name="q2"
            isEdit={true}
            placeholder="Валидация required, isYear, isQuarter"
            rules={{
              required: 'Поле обязательно для заполнения',
              validate: {
                isYear: (value) => {
                  return value
                    ? !!value.year.start || 'Выберите год'
                    : 'Выберите год';
                },
                isQuarter: (value) => {
                  return value
                    ? !!value.quarter || 'Выберите квартал'
                    : 'Выберите квартал';
                },
              },
            }}
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
