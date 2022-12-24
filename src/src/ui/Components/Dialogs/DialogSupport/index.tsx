import React from 'react';
import useViewModel from '../../../hooks/useViewModel';
import {FormProvider, FieldValues, useForm} from 'react-hook-form';
import {FormModal} from '../../../Common/FormComponents';
import {SupportForm, supportFormDefaultValues} from '../../Forms';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {ISupportViewModel} from '../../../../ViewModel/viewModels/Support/interfaces';
import './index.less';

export const DialogSupport = () => {
  const viewModel = useViewModel<ISupportViewModel>(VIEW_MODEL.Support);

  const methods = useForm<FieldValues>({
    defaultValues: supportFormDefaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <FormModal
        viewModel={viewModel}
        title="Обращение в службу технической поддержки"
        labelSubmitButton="Отправить"
      >
        <SupportForm />
      </FormModal>
    </FormProvider>
  );
};
