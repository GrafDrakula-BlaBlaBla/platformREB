import React from 'react';
import {Form} from '../../../../Common/FormComponents';
import {CFAMainSection} from '../CFARequestApiSections/CFAMainSection';
import {CFACustomerSection} from '../CFARequestApiSections/CFACustomerSection';
import {CFAParametersViewSection} from '../CFARequestApiSections/CFAParametersViewSection';

export const CFAConfirmParams = () => {
  return (
    <Form className="cfa-confirm-params">
      <CFAMainSection title="1. Параметры" subtitle="Общая информация" />
      <CFACustomerSection subtitle="Заёмщик/приказодатель" />
      <CFAParametersViewSection subtitle="Предварительные параметры" />
    </Form>
  );
};
