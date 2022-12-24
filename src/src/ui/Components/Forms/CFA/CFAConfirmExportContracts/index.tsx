import React from 'react';
import {FormSection, Form} from '../../../../Common/FormComponents';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ReactComponent as DocPageIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {ICFAExportContractViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/exportContract/interfaces';
import {Divider} from '../../../../Common/SimpleComponents/Divider';
import {CFAExportContractViewForm} from '../../ExportContract/CFAExportContractViewForm';
import './index.less';

export const CFAConfirmExportContracts = () => {
  const {exportContractList} = useViewModel<ICFAExportContractViewModel>(
    VIEW_MODEL.CFAExportContract
  );

  return (
    <Form className="cfa-confirm-export-contracts">
      <FormSection title="3. Экспортные контракты">
        {Array.isArray(exportContractList) && exportContractList.length > 0 ? (
          exportContractList.map((data, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider />}
              <CFAExportContractViewForm data={data} subtitle={data.title} />
            </React.Fragment>
          ))
        ) : (
          <NoData icon={<DocPageIcon />} message="Нет экспортных контрактов" />
        )}
      </FormSection>
    </Form>
  );
};
