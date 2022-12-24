import React, {useEffect} from 'react';
import {ECFADraftTypes, ICFADraftDTO} from '../../../../../Model/CFA_Draft';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {TextFieldControlUseForm} from '../../../../Common/FieldControls';
import {useFormContext} from 'react-hook-form';
import './index.less';

export const CFADraftCreateFormDefaultValues: Partial<ICFADraftDTO> = {
  requestId: '',
  draftType: ECFADraftTypes.CREATION,
};

export const CFADraftCreateForm = () => {
  const {reset} = useFormContext();

  useEffect(() => {
    reset(CFADraftCreateFormDefaultValues);
    return () => {
      reset(CFADraftCreateFormDefaultValues);
    };
  }, [reset]);

  return (
    <Form className="cfa-draft-create-form">
      <FormSection>
        <FormField title="Введите ID сделки">
          <TextFieldControlUseForm
            name="requestId"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
      </FormSection>
    </Form>
  );
};
