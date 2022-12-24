import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import React, {useState} from 'react';
import {IExportContractDTO} from '../../../Model/Credits';
import {ExportContractViewForm} from '../Forms';

interface IProps {
  exportContract: IExportContractDTO;
}

export const ExportContractCollapse = ({exportContract}: IProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="Export">
      <Accordion>
        <AccordionSummary
          className={['exportContract', isActive ? 'active' : ''].join(' ')}
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => {
            setIsActive((isOpen) => !isOpen);
          }}
        >
          <Typography>
            {`Экспортный контракт №${exportContract.numberOfExportContract} от ${exportContract.dateOfExportContract}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="a-details">
          <ExportContractViewForm data={exportContract} />
        </AccordionDetails>
      </Accordion>
      <div
        className={['a-footer', isActive ? 'a-footeractive' : ''].join(' ')}
      />
    </div>
  );
};
