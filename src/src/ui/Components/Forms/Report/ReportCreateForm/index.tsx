import React, {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  DateYearFieldControlUseForm,
  IRadioItem,
  RadioGroupFieldControlUseForm,
} from '../../../../Common/FieldControls';
import './index.less';

interface IReportCreateFormProps {
  isEdit?: boolean;
}

export const reportCreateFormDefaultValues = {
  year: new Date().getFullYear(),
  quarter: '1',
};

export const ReportCreateForm = ({isEdit = true}: IReportCreateFormProps) => {
  const {reset} = useFormContext();

  // eslint-disable-next-line
  useEffect(() => () => reset(reportCreateFormDefaultValues), []);

  const radioItems: IRadioItem[] = [
    {label: '1 квартал', value: '1'},
    {label: '1, 2 квартал', value: '2'},
    {label: '1, 2, 3 квартал', value: '3'},
    {label: '1, 2, 3, 4 квартал', value: '4'},
  ];

  return (
    <Form className="report-form">
      <FormSection>
        <FormField title="Выбрать год">
          <DateYearFieldControlUseForm
            name="year"
            isEdit={isEdit}
            placeholder="Выберите год"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
        <FormField title="Выбрать период">
          <RadioGroupFieldControlUseForm
            name="quarter"
            isEdit={isEdit}
            items={radioItems}
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
      </FormSection>
    </Form>
  );
};
