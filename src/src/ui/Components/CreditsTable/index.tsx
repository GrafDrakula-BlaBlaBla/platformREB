import React from 'react';
import {ICreditDTO} from '../../../Model/Credits';
import {Table, TCustomRowRender} from '../../Common/TableComponents';
import {TableCollapseRow, ITableCollapseColumn} from './TableCollapseRow';
import {CreditTableConfig} from './Config';
import {CreditDetails} from './CreditDetails';
import {ReactComponent as CreditCardIcon} from '../../../assets/svg/commonArea/CreditCard.svg';

interface IProps {
  creditsData: ICreditDTO[];
  pagination?: boolean;
  onRemove?: (creditData: ICreditDTO) => void;
}

export const CreditsTable = ({creditsData, pagination, onRemove}: IProps) => {
  return (
    <Table<ICreditDTO>
      data={creditsData}
      config={CreditTableConfig}
      customRowRender={CustomRowRender(onRemove)}
      emptyInfo={{
        icon: <CreditCardIcon />,
      }}
      pagination={pagination}
    />
  );
};

const CustomRowRender = (
  onRemove?: (creditData: ICreditDTO) => void
): TCustomRowRender<ICreditDTO> => (
  data: ICreditDTO[],
  columns: {[key in keyof ICreditDTO]?: ITableCollapseColumn<ICreditDTO>}
): Array<JSX.Element> => {
  return data.map((row, index) => (
    <TableCollapseRow
      key={index}
      row={row}
      columns={columns}
      collapseContent={<CreditDetails key={index} creditItem={row} />}
      onRowClick={(e, row) => {}}
      onRemove={onRemove}
    />
  ));
};
