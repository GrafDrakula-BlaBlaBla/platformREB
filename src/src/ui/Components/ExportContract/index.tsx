import React from 'react';
import {IExportContractDTO} from '../../../Model/Credits';
import {ExportContractCollapse} from './ExportContractCollapse';
import './index.less';

interface IProps {
  data: Array<IExportContractDTO>;
}

export const ExportContracts = ({data}: IProps): JSX.Element | null => {
  return data ? (
    <>
      {data.map((exportContract, index) => {
        return (
          <ExportContractCollapse
            key={`${exportContract.dateOfExportContract}_${exportContract.numberOfExportContract}-${index}`}
            exportContract={exportContract}
          />
        );
      })}
    </>
  ) : null;
};
