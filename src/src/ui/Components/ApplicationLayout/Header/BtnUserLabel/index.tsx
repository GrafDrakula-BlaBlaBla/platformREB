import React from 'react';
import useViewModel from '../../../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {BankStatusWrapper} from '../BankStatusWrapper';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../../../ViewModel/viewModels/Banks';
import {IUserViewModel} from '../../../../../ViewModel/viewModels/User/interfaces';
import {getFIO} from '../../../../../Model/User/functions';
import './index.less';

export const BtnUserLabel = observer(() => {
  const {currentUser} = useViewModel<IUserViewModel>(VIEW_MODEL.User);
  const {currentBank} = useViewModel<IBankViewModel>(VIEW_MODEL.Banks);
  return (
    <div className="btn-user-label">
      <span className="btn-user-label__name">
        {getFIO(currentUser) || currentUser?.email}
      </span>
      {!currentUser?.isReb ? (
        <BankStatusWrapper
          className="btn-user-label__message"
          status={currentBank?.status}
        />
      ) : null}
    </div>
  );
});
