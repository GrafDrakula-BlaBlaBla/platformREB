import React from 'react';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFAExportContractViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/exportContract/interfaces';
import {Loader} from '../../../../../Common/SimpleComponents/Loader';
import useViewModel from '../../../../../hooks/useViewModel';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import {CollapseExportContracts} from '../../CollapseExportContracts';
import {observer} from 'mobx-react-lite';

export const Current = observer(() => {
  const {exportContractList: list, loading} = useViewModel<
    ICFAExportContractViewModel
  >(VIEW_MODEL.CFAExportContract);

  if (loading) {
    return <Loader />;
  }
  if (Array.isArray(list) && list.length > 0) {
    return (
      <>
        {list.map((item) => {
          return <CollapseExportContracts key={item.objectId} data={item} />;
        })}
      </>
    );
  }

  return <NoData icon={<DocPageIcon />} message="Нет экспортных контрактов" />;
});
