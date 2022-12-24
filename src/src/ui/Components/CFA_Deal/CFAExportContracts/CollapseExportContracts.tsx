import React from 'react';
import {ICFAExportContractDTO} from '../../../../Model/CFA_Deal';
import {AccordionContainer} from '../../../Common/SimpleComponents/Accordion';
import {CFAExportContractViewForm} from '../../Forms';

interface ICollapseExportContractsProps {
  data: ICFAExportContractDTO;
}
export const CollapseExportContracts = (
  props: ICollapseExportContractsProps
) => {
  const {data} = props;
  return (
    <AccordionContainer title={data.title} footer>
      <CFAExportContractViewForm data={data} />
    </AccordionContainer>
  );
};
