import React from 'react';
import {FormField, FormSection} from '../../../../../Common/FormComponents';
import {Skeleton} from '@material-ui/lab';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../../hooks/useViewModel';
import {IBankSettingsViewModel} from '../../../../../../ViewModel/viewModels/Banks';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {SwitchFieldControl} from '../../../../../Common/FieldControls';
import {AttachmentSingleFile} from '../../../../../Common/AttachmentSingle';
import {IAttachmentSingleDTO} from '../../../../../../Model/Attachment';
import './index.less';

export const BankSettingsAgreements = observer(() => {
  const {isManual, agreements, loadingBank, loadingAgreements} = useViewModel<
    IBankSettingsViewModel
  >(VIEW_MODEL.BankSettings);

  // @todo: прикрутить апи файла
  const onDownload = (documentId: string) => {
    alert(`download ${documentId}`);
  };
  const onUpload = () => {
    alert('uplaod');
  };
  const onRemove = (documentId: string) => {
    alert(`remove ${documentId}`);
  };

  return (
    <FormSection title="2. Соглашения" className="bank-settings-agreements">
      {loadingAgreements ? (
        <React.Fragment>
          <FormField title={<Skeleton width={120} />}>
            <Skeleton width={490} />
          </FormField>
          <FormField title={<Skeleton width={210} />}>
            <Skeleton width={490} />
          </FormField>
        </React.Fragment>
      ) : (
        agreements?.map((agreement) => {
          let attachment: IAttachmentSingleDTO | undefined;
          if (agreement.objectId)
            attachment = {
              id: agreement.objectId,
              attachmentName: agreement.docTitle,
              attachmentSize: agreement.docSize,
            } as IAttachmentSingleDTO;
          return (
            <FormField title={agreement.docType} key={agreement.objectId}>
              <AttachmentSingleFile
                attachment={attachment}
                isDownload={true}
                isUpload={true}
                isRemove={true}
                handleDownload={onDownload}
                handleUpload={onUpload}
                handleRemove={onRemove}
              />
            </FormField>
          );
        })
      )}
      {loadingBank ? (
        <FormField title={<Skeleton width={130} />} />
      ) : (
        <FormField>
          <SwitchFieldControl value={isManual} label="Интеграция" disabled />
        </FormField>
      )}
    </FormSection>
  );
});
