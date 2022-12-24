import React from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {Form} from '../../../../Common/FormComponents';
import {Divider} from '../../../../Common/SimpleComponents/Divider';
import {ICFARequestViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/request';
import {CFARequestSkeleton} from '../../../CFA_Deal/CFARequestSkeleton';
import {CFAMainSection} from '../CFARequestApiSections/CFAMainSection';
import {CFACustomerSection} from '../CFARequestApiSections/CFACustomerSection';
import {CFAParametersViewSection} from '../CFARequestApiSections/CFAParametersViewSection';
import {CFAParametersEditSection} from '../CFARequestApiSections/CFAParametersEditSection';

export const CFARequestApiViewForm = observer(() => {
  const {loading, canEditParameters, isDone} = useViewModel<
    ICFARequestViewModel
  >(VIEW_MODEL.CFARequest);

  return loading ? (
    <CFARequestSkeleton />
  ) : (
    <Form className="cfa-request-api-view-form">
      <CFAMainSection title="1. Общая информация" />
      <Divider />
      <CFACustomerSection title="2. Заёмщик/приказодатель" />
      <Divider />
      {canEditParameters && !isDone ? (
        <CFAParametersEditSection title="3. Предварительные параметры" />
      ) : (
        <CFAParametersViewSection title="3. Предварительные параметры" />
      )}
    </Form>
  );
});
