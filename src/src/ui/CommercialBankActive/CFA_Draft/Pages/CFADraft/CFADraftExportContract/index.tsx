import {
  ICFADraftExportContractDTO,
  ICFADraftExportContractExtendedDTO,
} from '../../../../../../Model/CFA_Draft';
import React, {FC} from 'react';
import useViewModel from '../../../../../hooks/useViewModel';
import {ICFADraftExportContractComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/exportContract/interfaces';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFADraftComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {FormProvider, useForm} from 'react-hook-form';
import {useRoute} from 'react-router5';
import {AccordionContainer} from '../../../../../Common/SimpleComponents/Accordion';
import {getDateWithFrontEndFormat} from '../../../../../../Utils/Date/DateFormat';
import {CFADraftExportContractEditForm} from '../../../../../Components/Forms/ExportContract/CFADraftExportContractEditForm';
import {
  Button,
  IButtonProps,
} from '../../../../../Common/SimpleComponents/Button';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import './index.less';
import {useUniqueState} from '../../../../../hooks/useUniqueState';

interface ICFADraftExportContractProps {
  data: ICFADraftExportContractExtendedDTO;
}

export const CFADraftExportContract: FC<ICFADraftExportContractProps> = observer(
  (props) => {
    const {data} = props;

    const {route} = useRoute();

    const [isSavingForm, setIsSavingForm] = useUniqueState<null>(null);
    const trigger = () => setIsSavingForm(null);

    const {save, delete: deleteContract, setContractIsDirty} = useViewModel<
      ICFADraftExportContractComViewModel
    >(VIEW_MODEL.CFADraftExportContract);

    const {isCreated} = useViewModel<ICFADraftComViewModel>(
      VIEW_MODEL.CFADraft
    );

    const formMethods = useForm<ICFADraftExportContractDTO>({
      defaultValues: {},
      mode: 'onChange',
    });
    const onDelete = async () => {
      await deleteContract(route.params.id, data.tempId as string);
    };
    const onSave = async () => {
      await formMethods.trigger();
      trigger();
      if (data.isValid && data.isDirty) {
        await save(route.params.id, data as ICFADraftExportContractDTO);
        setContractIsDirty(data.tempId as string, false);
      }
    };

    const title = data.id
      ? `Экспортный контракт № ${
          data.numberOfExportContract ? data.numberOfExportContract : '_'
        } от ${
          moment(data.dateOfExportContract).isValid()
            ? getDateWithFrontEndFormat(data.dateOfExportContract)
            : '_'
        }`
      : 'Экспортный контракт';

    const buttons: IButtonProps[] = [];
    if (isCreated) {
      buttons.push({
        size: 'small',
        variant: 'outlined',
        color: 'red',
        disabled: !data.canDelete,
        onClick: onDelete,
        children: 'Удалить',
      });
      buttons.push({
        size: 'small',
        variant: 'outlined',
        color: 'default',
        onClick: onSave,
        disabled: !data.isDirty,
        children: 'Сохранить',
      });
    }

    return (
      <div className="cfa-draft-export-contract">
        <AccordionContainer
          title={title}
          error={!data.isValid}
          footerButtons={buttons.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        >
          <FormProvider {...formMethods}>
            <CFADraftExportContractEditForm
              data={data}
              isEdit={isCreated}
              isSavingForm={isSavingForm}
            />
          </FormProvider>
        </AccordionContainer>
      </div>
    );
  }
);
