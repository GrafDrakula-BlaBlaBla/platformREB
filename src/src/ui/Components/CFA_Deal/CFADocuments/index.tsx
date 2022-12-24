import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import PermissionContext from '../../../app/contexts/PremissionContext';
import {useFilters} from '../../../hooks/useFilters';
import useViewModel from '../../../hooks/useViewModel';
import {NoData} from '../../../Common/SimpleComponents/NoData';
import {AttachmentFile} from '../../../Common/Attachment';
import {ICFADocumentViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/document/interfaces';
import {ReactComponent as DocPageIcon} from '../../../../assets/svg/commonArea/DocPage.svg';

export interface ICFADocumentsProps {
  downloadPermission: string;
}
export const CFADocuments = observer((props: ICFADocumentsProps) => {
  const {downloadPermission} = props;
  const {isAccess} = useContext(PermissionContext);
  const isDownload = isAccess(downloadPermission, 'download');

  const {
    loading,
    documentList,
    getDocumentList,
    setDocumentList,
    downloadDocument,
    downloadDocuments,
    downloadDocumentsAll,
  } = useViewModel<ICFADocumentViewModel>(VIEW_MODEL.CFADocument);

  const {route} = useRoute();
  const {subscribeOnFilters} = useFilters();

  useEffect(() => {
    subscribeOnFilters((filters) => {
      getDocumentList(route.params.id, filters);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      setDocumentList();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AttachmentFile
      loading={loading}
      isDownload={isDownload}
      isDownloadAll={isDownload}
      isUpload={false}
      isRemove={false}
      emptyTableInfo={
        <NoData
          icon={<DocPageIcon />}
          message="Документы будут загружены и отображены на экране автоматически
           после согласования сделки"
        />
      }
      attachments={documentList?.items}
      total={documentList?.total}
      pagination={true}
      handleDownload={(ids) => {
        if (ids.length === 1) downloadDocument(ids[0]);
        else if (ids.length > 1) downloadDocuments(ids);
      }}
      handleDownloadAll={downloadDocumentsAll}
    />
  );
});
