import React, {FC} from 'react';
import {ICFABankUserDTO} from '../../../../Model/CFA_Deal';
import {getShortFIO} from '../../../../Model/User/functions';

interface IProps {
  data?: ICFABankUserDTO[];
}

export const WrapperAssignedEmployees: FC<IProps> = ({data}) => {
  return (
    <div>
      {data
        ?.filter((_, i) => i < 2)
        .map((user, index) => (
          <div key={index}>
            {getShortFIO(user?.surname, user?.name, user?.patronymic)}
          </div>
        ))}
      {data && data.length > 2 && (
        <div className="color-gray">{`(еще ${data.length - 2})`}</div>
      )}
    </div>
  );
};
