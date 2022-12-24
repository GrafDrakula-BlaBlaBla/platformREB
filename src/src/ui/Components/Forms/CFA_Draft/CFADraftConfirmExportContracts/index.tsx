import React from 'react';
import {observer} from 'mobx-react-lite';
import {FormSection, Form} from '../../../../Common/FormComponents';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ReactComponent as DocPageIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {CFADraftConfirmExportContract} from '../CFADraftConfirmExportContract';
import {Notify, NOTIFY_TYPE} from '../../../../Common/SimpleComponents/Notify';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import './index.less';
import {ICFADraftExportContractComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/exportContract/interfaces';

export const CFADraftConfirmExportContracts = observer(() => {
  const {list: contractsList, isValid: isValidContracts} = useViewModel<
    ICFADraftExportContractComViewModel
  >(VIEW_MODEL.CFADraftExportContract);

  return (
    <Form className="cfa-draft-confirm-export-contracts">
      <FormSection title="3. Экспортные контракты">
        {isValidContracts ? (
          Array.isArray(contractsList) && contractsList.length > 0 ? (
            contractsList.map((dataExportContract) => (
              <CFADraftConfirmExportContract
                key={dataExportContract.id}
                data={dataExportContract}
              />
            ))
          ) : (
            <NoData
              icon={<DocPageIcon />}
              message="Нет экспортных контрактов"
            />
          )
        ) : (
          <Notify
            type={NOTIFY_TYPE.error}
            icon={<CancelIcon />}
            text="Добавьте экспортные контракты."
          />
        )}
      </FormSection>
    </Form>
  );
});
