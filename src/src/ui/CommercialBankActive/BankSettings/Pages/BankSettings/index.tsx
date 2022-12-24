import React from 'react';
import {PageLayout} from '../../../../Common/PageLayout';
import {Form} from '../../../../Common/FormComponents';
import {Divider} from '../../../../Common/SimpleComponents/Divider';
import {BankSettingsAbout} from './BankSettingsAbout';
import {BankSettingsAgreements} from './BankSettingsAgreements';
import {BankSettingsProducts} from './BankSettingsProducts';
import {BankSettingsTerritorialBanks} from './BankSettingsTerritorialBanks';
import './index.less';

export const BankSettings = () => {
  return (
    <PageLayout title="Настройки банка">
      <Form className="bank-settings">
        <BankSettingsAbout />
        <Divider />
        <BankSettingsAgreements />
        <Divider />
        <BankSettingsProducts />
        <Divider />
        <BankSettingsTerritorialBanks />
      </Form>
    </PageLayout>
  );
};
