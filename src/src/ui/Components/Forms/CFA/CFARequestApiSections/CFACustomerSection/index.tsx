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

export const CFACustomerSection = (props: IFormSectionProps) => {
  const {data} = useViewModel<ICFARequestViewModel>(VIEW_MODEL.CFARequest);
  const {cfaIndustries} = useViewModel<IDictionaryViewModel>(
    VIEW_MODEL.Dictionary
  );
  const cls = ClassNameInjection('cfa-customer-section', props.className);
  return (
    <FormSection {...props} className={cls}>
      <FormField isRow title="Наименование">
        <TextFieldControlView value={data?.fullName} />
      </FormField>
      <FormField isRow title="ИНН">
        <TextFieldControlView value={data?.inn} />
      </FormField>
      <FormField isRow title="ОКВЭД">
        <TextFieldControlView value={data?.okved2} />
      </FormField>
      <FormField isRow title="Сегмент">
        <SelectFieldControlView
          items={SelectItemsFromDictionary(cfaIndustries)}
          value={data?.industry}
        />
      </FormField>
      <FormField isRow title="Субъект РФ">
        <TextFieldControlView value={data?.tb} />
      </FormField>
    </FormSection>
  );
};
