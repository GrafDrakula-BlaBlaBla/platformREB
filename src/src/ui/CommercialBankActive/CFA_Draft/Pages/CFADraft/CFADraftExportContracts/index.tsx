import React from 'react';
import {observer} from 'mobx-react-lite';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import useViewModel from '../../../../../hooks/useViewModel';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {Button} from '../../../../../Common/SimpleComponents/Button';
import {LoaderWithBackdrop} from '../../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {ICFADraftComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {ICFADraftExportContractComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/exportContract/interfaces';
import {CFADraftExportContract} from '../CFADraftExportContract';
import './index.less';

export const CFADraftExportContracts = observer(() => {
  const {loading, list, add} = useViewModel<
    ICFADraftExportContractComViewModel
  >(VIEW_MODEL.CFADraftExportContract);
  const {isCreated} = useViewModel<ICFADraftComViewModel>(VIEW_MODEL.CFADraft);

  const Footer = () => {
    return (
      <div className="cfa-draft-export-contracts__footer">
        <div className="link" onClick={add}>
          + Добавить контракт
        </div>
      </div>
    );
  };
  const EmptyData = () => {
    return (
      <NoData
        icon={<DocPageIcon />}
        message={
          isCreated
            ? 'Сейчас у вас нет добавленных экспортных контрактов'
            : 'Нет добавленных экспортных контрактов'
        }
        reloadButton={
          isCreated ? (
            <Button
              children="Добавить контракт"
              variant="outlined"
              color="default"
              onClick={() => add()}
            />
          ) : undefined
        }
      />
    );
  };

  return (
    <div className="cfa-draft-export-contracts">
      <LoaderWithBackdrop loading={loading} />
      {list && list.length > 0 ? (
        <React.Fragment>
          {list.map((contract, index) => (
            <CFADraftExportContract key={contract.tempId} data={contract} />
          ))}
          {isCreated && <Footer />}
        </React.Fragment>
      ) : (
        <EmptyData />
      )}
    </div>
  );
});
