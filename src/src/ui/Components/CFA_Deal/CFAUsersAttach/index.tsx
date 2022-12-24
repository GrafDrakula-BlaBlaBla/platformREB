import React, {useContext, useEffect, useState} from 'react';
import PermissionContext from '../../../app/contexts/PremissionContext';
import {useRoute} from 'react-router5';
import useViewModel from '../../../hooks/useViewModel';
import {ICFARequestViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/request';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {CFAUsersSelectFieldControl} from '../CFAUsersSelectFieldControl';
import {observer} from 'mobx-react-lite';
import {Skeleton} from '@material-ui/lab';

interface IProps {
  loading?: boolean;
}
export const CFAUsersAttach = observer((props: IProps) => {
  const {loading} = props;
  const {route} = useRoute();

  const {data, availableUsers, attachUsers, getRequestUsers} = useViewModel<
    ICFARequestViewModel
  >(VIEW_MODEL.CFARequest);

  const [users, setUsers] = useState<unknown[] | undefined>();
  useEffect(() => {
    setUsers(data?.assignedEmployees?.map((user) => user.id));
  }, [data]);
  const onSaveUsers = async (values?: unknown[]) => {
    await attachUsers(route.params.id, values as string[]);
    await getRequestUsers(route.params.id);
  };
  const onCancelUsers = () => {
    setUsers(data?.assignedEmployees?.map((user) => user.id));
  };
  const onChangeUsers = (value?: unknown[]) => {
    setUsers(value);
  };

  const {isAccess} = useContext(PermissionContext);
  const canAttachUsersUrl = 'credit-for-accreditive/attach-users';
  const canAttachUsers = isAccess(canAttachUsersUrl, 'PUT');

  return loading ? (
    <Skeleton height={18} width={300} />
  ) : (
    <CFAUsersSelectFieldControl
      value={users}
      items={availableUsers}
      onChange={onChangeUsers}
      onCancel={onCancelUsers}
      onClose={onCancelUsers}
      onSave={onSaveUsers}
      disabled={!canAttachUsers}
    />
  );
});
