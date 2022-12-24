import React from 'react';
import {FormField, FormSection} from '../../../../../Common/FormComponents';
import {observer} from 'mobx-react-lite';
import {TerritorialBank} from './TerritorialBank';
import useViewModel from '../../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {Skeleton} from '@material-ui/lab';
import {Button} from '../../../../../Common/SimpleComponents/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {IBankSettingsViewModel} from '../../../../../../ViewModel/viewModels/Banks';
import './index.less';

export const BankSettingsTerritorialBanks = observer(() => {
  const {
    territorialBanks,
    loadingTerritorialBanks: loading,
    isTerritorialBankAdding,
    territorialBankAdd,
  } = useViewModel<IBankSettingsViewModel>(VIEW_MODEL.BankSettings);

  return loading ? (
    <FormSection title="4. Территориальные банки">
      <FormField>
        <Skeleton width={504} />
      </FormField>
      <FormField>
        <Skeleton width={504} />
      </FormField>
    </FormSection>
  ) : (
    <FormSection
      title="4. Территориальные банки"
      className="bank-settings-territorial-banks"
    >
      {territorialBanks?.map((bank) => (
        <TerritorialBank data={bank} key={bank.id} />
      ))}
      {!isTerritorialBankAdding && (
        <Button
          variant="outlined"
          color="default"
          className="bank-settings-territorial-banks__add"
          onClick={territorialBankAdd}
        >
          <AddCircleIcon className="bank-settings-territorial-banks__add-icon" />
          <div className="bank-settings-territorial-banks__add-label">
            Добавить новый банк
          </div>
        </Button>
      )}
    </FormSection>
  );
});
