import React from 'react';
import {ICFAExportContractPreliminaryViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/exportContractPreliminary/interfaces';
import {Loader} from '../../../../../Common/SimpleComponents/Loader';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {useViewModelByKey} from '../../../../../hooks/useViewModel';
import {CollapseExportContractsPreliminary} from './CollapseExportContractsPreliminary';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import {observer} from 'mobx-react-lite';
import './index.less';

export const Preliminary = observer(() => {
  const {
    exportContractPreliminaryList: listECP,
    loading,
    createInitialFormExportContractPreliminary,
  } = useViewModelByKey<ICFAExportContractPreliminaryViewModel>(
    'CFAExportContractPreliminary'
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {listECP && Array.isArray(listECP.items) && listECP.items.length > 0 ? (
        listECP.items.map((item) => {
          return (
            <CollapseExportContractsPreliminary key={item.id} data={item} />
          );
        })
      ) : (
        <NoData
          icon={<DocPageIcon />}
          message="Нет предварительных экспортных контрактов"
        />
      )}
      <span
        className="cfa-export-contract-preliminary-form__button-add link"
        onClick={createInitialFormExportContractPreliminary}
      >
        + Добавить контракт/проект
      </span>
    </>
  );
});
