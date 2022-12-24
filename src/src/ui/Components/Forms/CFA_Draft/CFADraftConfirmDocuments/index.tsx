import React from 'react';
import {FormSection, Form} from '../../../../Common/FormComponents';
import {AttachmentFile} from '../../../../Common/Attachment';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {ReactComponent as DocPageIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';
import useViewModel from '../../../../hooks/useViewModel';
import {ICFADraftDocumentComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/document/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {Notify, NOTIFY_TYPE} from '../../../../Common/SimpleComponents/Notify';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import './index.less';

export const CFADraftConfirmDocuments = () => {
  const {documentList, isValid: isValidDocuments} = useViewModel<
    ICFADraftDocumentComViewModel
  >(VIEW_MODEL.CFADraftDocument);

  return (
    <Form className="cfa-draft-confirm-documents">
      <FormSection title="2. Документы">
        {isValidDocuments ? (
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
        ) : (
          <Notify
            type={NOTIFY_TYPE.error}
            icon={<CancelIcon />}
            text="Загрузите документы."
          />
        )}
      </FormSection>
    </Form>
  );
};
