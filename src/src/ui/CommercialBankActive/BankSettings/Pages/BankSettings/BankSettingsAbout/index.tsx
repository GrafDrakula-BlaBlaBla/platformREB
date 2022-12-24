import React from 'react';
import useViewModel from '../../../../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {IBankSettingsViewModel} from '../../../../../../ViewModel/viewModels/Banks';
import {FormField, FormSection} from '../../../../../Common/FormComponents';
import {TextFieldControlView} from '../../../../../Common/FieldControls';
import {Skeleton} from '@material-ui/lab';

export const BankSettingsAbout = observer(() => {
  const {bank, loadingBank: loading} = useViewModel<IBankSettingsViewModel>(
    VIEW_MODEL.BankSettings
  );
  return loading ? (
    <FormSection title="1. Информация о банке">
      <FormField title={<Skeleton width={140} />}>
        <Skeleton width={360} />
      </FormField>
      <FormField title={<Skeleton width={30} />}>
        <Skeleton width={70} />
      </FormField>
      <FormField title={<Skeleton width={170} />}>
        <Skeleton width={160} />
      </FormField>
      <FormField title={<Skeleton width={130} />}>
        <Skeleton width={190} />
      </FormField>
    </FormSection>
  ) : (
    <FormSection title="1. Информация о банке">
      <FormField title="Наименование банка">
        <TextFieldControlView value={bank?.bankName} />
      </FormField>
      <FormField title="БИК">
        <TextFieldControlView value={bank?.bic} />
      </FormField>
      <FormField title="Корреспондентский счет">
        <TextFieldControlView value={bank?.correspondentAcc} />
      </FormField>
      <FormField title="Юридический адрес">
        <TextFieldControlView value={bank?.legalAddress} />
      </FormField>
    </FormSection>
  );
});
