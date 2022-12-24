import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import PermissionContext from '../../../../../app/contexts/PremissionContext';
import {useFilters} from '../../../../../hooks/useFilters';
import useViewModel from '../../../../../hooks/useViewModel';
import {AttachmentFile} from '../../../../../Common/Attachment';
import {ICFADraftComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {ICFADraftDocumentComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/document/interfaces';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';

export interface ICFADocumentsProps {
  downloadPermission: string;
}
export const CFADraftDocuments = observer((props: ICFADocumentsProps) => {
  const {downloadPermission} = props;
  const {isAccess} = useContext(PermissionContext);
  const isDownload = isAccess(downloadPermission, 'download');

  const {isCreated} = useViewModel<ICFADraftComViewModel>(VIEW_MODEL.CFADraft);

  const {
    loading,
    documentList,
    getDocumentList,
    downloadDocument,
    downloadDocuments,
    downloadDocumentsAll,
    uploadDocuments,
    deleteDocument,
  } = useViewModel<ICFADraftDocumentComViewModel>(VIEW_MODEL.CFADraftDocument);

  const {route} = useRoute();
  const {subscribeOnFilters} = useFilters();

  useEffect(() => {
    subscribeOnFilters((filters) => {
      getDocumentList(route.params.id, filters);
    });

    //@todo: Спросить у Миши Балуева для чего происходит размонитирование с вызовом setDocumentList()
    // return () => {
    //   setDocumentList();
    // };
    // eslint-disable-next-line
  }, []);

  return (
    <AttachmentFile
      loading={loading}
      isDownload={isDownload}
      isDownloadAll={isDownload}
      isUpload={isCreated}
      isRemove={isCreated}
      attachments={documentList?.items}
      total={documentList?.total}
      pagination={true}
      handleUpload={uploadDocuments}
      handleRemove={deleteDocument}
      handleDownload={(ids) => {
        if (ids.length === 1) downloadDocument(ids[0]);
        else if (ids.length > 1) downloadDocuments(ids);
      }}
      handleDownloadAll={downloadDocumentsAll}
      emptyTableInfo={
        !isCreated ? (
          <NoData icon={<DocPageIcon />} message="Документы не загружены" />
        ) : undefined
      }
    />
  );
});
