import React from 'react';
import {FormSection, Form} from '../../../../Common/FormComponents';
import {AttachmentFile} from '../../../../Common/Attachment';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {ReactComponent as DocPageIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ICFADocumentViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/document/interfaces';
import './index.less';

export const CFAConfirmDocuments = () => {
  const {documentList} = useViewModel<ICFADocumentViewModel>(
    VIEW_MODEL.CFADocument
  );

  return (
    <Form className="cfa-confirm-documents">
      <FormSection title="2. Документы">
        <AttachmentFile
          attachments={documentList?.items}
          total={documentList?.total}
          isHeaderHidden={true}
          emptyTableInfo={
            <NoData
              icon={<DocPageIcon />}
              message="Документы будут загружены и отображены на экране автоматически
           после согласования сделки"
            />
          }
        />
      </FormSection>
    </Form>
  );
};
