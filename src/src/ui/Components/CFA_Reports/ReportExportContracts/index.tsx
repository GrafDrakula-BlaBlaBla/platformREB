import React from 'react';
import {AccordionContainer} from '../../../Common/SimpleComponents/Accordion';
import {ICFA_ReportExportContractDTO} from '../../../../Model/CFA_Reports';
import {CFAReportExportContractViewForm} from '../../Forms/ExportContract/CFAReportExportContractViewForm';
import './index.less';

interface IReportExportContractsProps {
  data: ICFA_ReportExportContractDTO[];
}
export const ReportExportContracts = (props: IReportExportContractsProps) => {
  const {data} = props;
  return (
    <div className="report-export-contracts">
      {data.map((contract, index) => (
        <AccordionContainer key={index} title={contract.title} footer>
          <CFAReportExportContractViewForm data={contract} />
        </AccordionContainer>
      ))}
    </div>
  );
};
