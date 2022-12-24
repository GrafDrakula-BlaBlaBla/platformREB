import React from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../hooks/useViewModel';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {
  SelectFieldControlView,
  TextFieldControlView,
} from '../../../../Common/FieldControls';
import {SelectItemsFromDictionary} from '../../../../Common/FieldControls/FieldControlsBase/SelectFieldControl/SelectItemsFromDictionary';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ICFARequestViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/request';
import {IDictionaryViewModel} from '../../../../../ViewModel/viewModels/Dictionary/interfaces';
import {CFARequestSkeleton} from '../../../CFA_Deal/CFARequestSkeleton';
import './index.less';

// const FIELD_XS = 200;
const FIELD_SM = 270;
// const FIELD_MD = 300;
const FIELD_LG = 400;

export const CFARequestManualViewForm = observer(() => {
  const {individualCategories, cfaStatuses, cfaIndustries} = useViewModel<
    IDictionaryViewModel
  >(VIEW_MODEL.Dictionary);

  const {data, loading} = useViewModel<ICFARequestViewModel>(
    VIEW_MODEL.CFARequest
  );

  return loading ? (
    <CFARequestSkeleton />
  ) : (
    <Form className="cfa-request-manual-view-form">
      <FormSection title="1. Общая информация" collapsible isOpen={true}>
        <FormField title="ID сделки">
          <TextFieldControlView
            value={data?.requestId}
            style={{width: FIELD_LG}}
          />
        </FormField>
        <FormField title="Статус">
          <SelectFieldControlView
            value={data?.status}
            style={{width: FIELD_SM}}
            items={SelectItemsFromDictionary(cfaStatuses, {
              value: '',
              label: 'Выберите статус сделки',
            })}
          />
        </FormField>
      </FormSection>
      <FormSection title="2. Заёмщик/приказодатель" collapsible isOpen={true}>
        <FormField title="Наименование">
          <TextFieldControlView
            value={data?.fullName}
            style={{width: FIELD_LG}}
          />
        </FormField>
        <FormField title="ИНН">
          <TextFieldControlView style={{width: FIELD_SM}} value={data?.inn} />
        </FormField>
        <FormField title="Макроотрасль">
          <SelectFieldControlView
            value={data?.industry}
            style={{width: FIELD_LG}}
            items={SelectItemsFromDictionary(cfaIndustries, {
              value: '',
              label: 'Выберите макроотрасль',
            })}
          />
        </FormField>
        <FormField title="Сегмент">
          <SelectFieldControlView
            value={data?.individualCategory}
            style={{width: FIELD_SM}}
            items={SelectItemsFromDictionary(individualCategories, {
              value: '',
              label: 'Выберите сегмент',
            })}
          />
        </FormField>
        <FormField title="Субъект РФ">
          <TextFieldControlView value={data?.tb} style={{width: FIELD_LG}} />
        </FormField>
      </FormSection>
    </Form>
  );
});
