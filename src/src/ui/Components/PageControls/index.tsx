import React from 'react';
import {PageLayout} from '../../Common/PageLayout';
import {ButtonControls} from './ButtonControls';
import {TextFieldControls} from './TextFieldControls';
import {PasswordFieldControls} from './PasswordFieldControls';
import {CurrencyFieldControls} from './CurrencyFieldControls';
import {PhoneFieldControls} from './PhoneFieldControls';
import {DateFieldControls} from './DateFieldControls';
import {ReportDateFieldControls} from './ReportDateFieldControls';
import {SelectFieldControls} from './SelectFieldControls';
import {MultiSelectFieldControls} from './MultiSelectFieldControls';
import {MultiSelectExtFieldControls} from './MultiSelectExtFieldControls';
import {CheckboxFieldControls} from './CheckboxFieldControls';
import {DateIntervalFieldControls} from './DateIntervalFieldControls';
import {DateYearFieldControls} from './DateYearFieldControls';
import {RadioGroupFieldControls} from './RadioGroupFieldControls';
import {SMSCodeFieldControls} from './SMSCodeFieldControls';
import {SwitchFieldControls} from './SwitchFieldControls';
import {NotifyControls} from './NotifyControls';
import './index.less';

export const PageControls = () => {
  return (
    <div className="page-controls">
      <PageLayout>
        <ButtonControls />
        <TextFieldControls />
        <PasswordFieldControls />
        <CurrencyFieldControls />
        <PhoneFieldControls />
        <SelectFieldControls />
        <MultiSelectFieldControls />
        <MultiSelectExtFieldControls />
        <DateFieldControls />
        <ReportDateFieldControls />
        <DateIntervalFieldControls />
        <DateYearFieldControls />
        <CheckboxFieldControls />
        <SwitchFieldControls />
        <RadioGroupFieldControls />
        <SMSCodeFieldControls />
        <NotifyControls />
      </PageLayout>
    </div>
  );
};
