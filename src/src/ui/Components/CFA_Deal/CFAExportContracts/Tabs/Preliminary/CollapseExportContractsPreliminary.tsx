import React from 'react';
import {useRoute} from 'react-router5';
import {
  ICFAExportContractPreliminaryExtendedDTO,
  ICFAExportContractPreliminaryViewModel,
} from '../../../../../../ViewModel/viewModels/CFA_Deal/exportContractPreliminary/interfaces';
import {AccordionContainer} from '../../../../../Common/SimpleComponents/Accordion';
import {
  Button,
  IButtonProps,
} from '../../../../../Common/SimpleComponents/Button';
import {useViewModelByKey} from '../../../../../hooks/useViewModel';
import {CFAExportContractPreliminaryForm} from '../../../../Forms/ExportContract/CFAExportContractPreliminaryForm';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';

interface ICollapseExportContractsPreliminary {
  data: ICFAExportContractPreliminaryExtendedDTO;
}

export const CollapseExportContractsPreliminary = ({
  data,
}: ICollapseExportContractsPreliminary) => {
  const {
    editExportContractPreliminary,
    deleteExportContractPreliminary,
    createExportContractPreliminary,
  } = useViewModelByKey<ICFAExportContractPreliminaryViewModel>(
    'CFAExportContractPreliminary'
  );

  const {
    route: {params},
  } = useRoute();

  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const buttons: IButtonProps[] = [];
  buttons.push({
    size: 'small',
    variant: 'outlined',
    color: 'red',
    onClick: () => deleteExportContractPreliminary(params.id, data.id),
    children: 'Удалить',
  });
  buttons.push({
    size: 'small',
    variant: 'outlined',
    color: 'default',
    onClick: () => {
      if (data.isInitial) {
        methods.trigger();
      }
      const errors = Object.keys(methods.control.formStateRef.current.errors);
      if (errors.length === 0) {
        if (data.isInitial) {
          createExportContractPreliminary(params.id, data.id);
        } else {
          editExportContractPreliminary(params.id, data.id);
        }
      }
    },
    children: 'Сохранить',
  });

  return (
    <FormProvider {...methods}>
      <AccordionContainer
        title="Экспортный проект/контракт"
        footer
        footerButtons={buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      >
        <CFAExportContractPreliminaryForm data={data} />
      </AccordionContainer>
    </FormProvider>
  );
};
