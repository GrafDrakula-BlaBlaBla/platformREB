import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {DetailsRequestAboutBank} from '../../../../Components/Accreditation/DetailsRequestAboutBank';
import {DetailsRequestAboutUser} from '../../../../Components/Accreditation/DetailsRequestAboutUser';
import useViewModel from '../../../../hooks/useViewModel';
import {IAccreditationCommercialViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {Form, FormSection} from '../../../../Common/FormComponents';
import {Divider} from '../../../../Common/SimpleComponents/Divider';
import {DialogAccreditationDocuments} from '../../../../Components/Dialogs/DialogAccreditationDocuments';
import {AttachmentFile} from '../../../../Common/Attachment';
import {DetailsFooterButtons} from '../DetailsFooterButtons';
import {EAccreditationStatuses} from '../../../../../Model/Accreditation';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';

export const AccreditationParams = observer(() => {
  const {item, attachmentsDocs} = useViewModel<
    IAccreditationCommercialViewModel
  >(VIEW_MODEL.Accreditation);

  const [isOpenDocs, setIsOpenDocs] = useState(false);
  const isDocuments: boolean =
    item?.status === EAccreditationStatuses.CREATED ||
    item?.status === EAccreditationStatuses.ON_REVISION;

  const isEdit: boolean =
    item?.status === EAccreditationStatuses.CREATED ||
    item?.status === EAccreditationStatuses.ON_REVISION ||
    item?.status === EAccreditationStatuses.MEETING_CREATED;

  return (
    <Form>
      <DetailsRequestAboutBank item={item} />
      <Divider />
      <DetailsRequestAboutUser item={item} />
      <Divider />
      <FormSection
        title="3. Документы"
        rightBlock={
          isDocuments ? (
            <div className="link" onClick={() => setIsOpenDocs(true)}>
              Список необходимых документов
            </div>
          ) : undefined
        }
      >
        {isDocuments ? (
          <DialogAccreditationDocuments
            isOpen={isOpenDocs}
            onClose={() => setIsOpenDocs(false)}
          />
        ) : null}
        <AttachmentFile
          attachments={attachmentsDocs.attachments}
          isDownload={true}
          isUpload={isDocuments}
          isRemove={isDocuments}
          loading={attachmentsDocs.loading}
          handleUpload={attachmentsDocs.upload}
          handleRemove={attachmentsDocs.remove}
          handleDownload={attachmentsDocs.download}
        />
      </FormSection>
      {isEdit ? <DetailsFooterButtons /> : undefined}
    </Form>
  );
});
