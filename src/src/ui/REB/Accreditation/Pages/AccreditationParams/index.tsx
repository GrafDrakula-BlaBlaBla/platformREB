import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {DetailsRequestAboutBank} from '../../../../Components/Accreditation/DetailsRequestAboutBank';
import {DetailsRequestAboutUser} from '../../../../Components/Accreditation/DetailsRequestAboutUser';
import useViewModel from '../../../../hooks/useViewModel';
import {IAccreditationREBViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {Form, FormSection} from '../../../../Common/FormComponents';
import {Divider} from '../../../../Common/SimpleComponents/Divider';
import {AttachmentFile} from '../../../../Common/Attachment';
import {DetailsFooterButtons} from '../DetailsFooterButtons';
import {EAccreditationStatuses} from '../../../../../Model/Accreditation';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';

export const AccreditationParams = observer(() => {
  const {item, consideration, getCurrentItem, attachmentsDocs} = useViewModel<
    IAccreditationREBViewModel
  >(VIEW_MODEL.Accreditation);

  const isEdit: boolean =
    item?.status === EAccreditationStatuses.CONSIDERATION ||
    item?.status === EAccreditationStatuses.ACCEPTED ||
    item?.status === EAccreditationStatuses.MEETING_ACCEPTED;

  useEffect(() => {
    if (
      item?.status === EAccreditationStatuses.SENT ||
      item?.status === EAccreditationStatuses.RESENT
    ) {
      consideration().then(getCurrentItem);
    }
    // eslint-disable-next-line
  }, [item]);

  return (
    <Form>
      <DetailsRequestAboutBank item={item} />
      <Divider />
      <DetailsRequestAboutUser item={item} />
      <Divider />
      <FormSection title="3. Документы">
        <AttachmentFile
          attachments={attachmentsDocs.attachments}
          isDownload={true}
        />
      </FormSection>
      {isEdit ? <DetailsFooterButtons /> : undefined}
    </Form>
  );
});
