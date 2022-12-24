import React from 'react';
import {
  FormField,
  FormSection,
  IFormSectionProps,
} from '../../../../../Common/FormComponents';
import {
  SelectFieldControlView,
  TextFieldControlView,
} from '../../../../../Common/FieldControls';
import useViewModel from '../../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFARequestViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {SelectItemsFromDictionary} from '../../../../../Common/FieldControls/FieldControlsBase/SelectFieldControl/SelectItemsFromDictionary';
import {IDictionaryViewModel} from '../../../../../../ViewModel/viewModels/Dictionary/interfaces';
import {ClassNameInjection} from '../../../../../../Utils/ClassNames/ClassNameInjection';

export const CFAMainSection = (props: IFormSectionProps) => {
  const {data} = useViewModel<ICFARequestViewModel>(VIEW_MODEL.CFARequest);
  const {cfaStatuses} = useViewModel<IDictionaryViewModel>(
    VIEW_MODEL.Dictionary
  );
  const cls = ClassNameInjection('cfa-main-section', props.className);
  return (
    <FormSection {...props} className={cls}>
      <FormField isRow title="ID сделки" error={!data?.requestId}>
        <TextFieldControlView value={data?.requestId} />
      </FormField>
      <FormField isRow title="Статус">
        <SelectFieldControlView
          value={data?.status}
          items={SelectItemsFromDictionary(cfaStatuses)}
        />
      </FormField>
    </FormSection>
  );
};
