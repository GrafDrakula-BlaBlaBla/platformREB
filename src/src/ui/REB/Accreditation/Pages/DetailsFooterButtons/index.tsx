import React, {useState} from 'react';
import useViewModel from '../../../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {Button, IButtonProps} from '../../../../Common/SimpleComponents/Button';
import {IAccreditationREBViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {ROUTER_CONST_REB} from '../../../../app/settings/routerConst/RouterConstREB';
import {DialogRequestRejected} from '../../Dialogs/DialogRequestRejected';
import {DialogRequestRevision} from '../../Dialogs/DialogRequestRevision';
import {EAccreditationStatuses} from '../../../../../Model/Accreditation';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import './index.less';

export const DetailsFooterButtons = observer(() => {
  const {
    item,
    loading,
    accept,
    complete,
    createMeeting,
    getCurrentItem,
    attachmentsDocs,
    attachmentsMeeting,
  } = useViewModel<IAccreditationREBViewModel>(VIEW_MODEL.Accreditation);
  const {route, router} = useRoute();

  const navigateTable = () =>
    router.navigate(ROUTER_CONST_REB.ACCREDITATION.fullName, {
      bankInfoId: route.params.bankInfoId,
    });

  const buttons: IButtonProps[] = [];
  if (item?.status === EAccreditationStatuses.CONSIDERATION) {
    buttons.push({
      onClick: () => {
        handlerOpenDialogRequestRejected();
      },
      children: 'Отклонить',
      variant: 'outlined',
      color: 'red',
    });
    buttons.push({
      onClick: () => {
        handlerOpenDialogRequestRevision();
      },
      children: 'На доработку',
      whiteTheme: true,
    });
    buttons.push({
      onClick: () => accept().then(getCurrentItem),
      children: 'Принять',
    });
  }
  if (item?.status === EAccreditationStatuses.ACCEPTED) {
    buttons.push({
      onClick: () => createMeeting().then(getCurrentItem).then(navigateTable),
      children: 'Назначить встречу',
    });
  }
  if (item?.status === EAccreditationStatuses.MEETING_ACCEPTED) {
    buttons.push({
      onClick: () => complete().then(getCurrentItem).then(navigateTable),
      children: 'Аккредитация пройдена',
    });
  }

  const [isOpenDialogRejected, setIsOpenDialogRejected] = useState<boolean>(
    false
  );
  const [isOpenDialogRevision, setIsOpenDialogRevision] = useState<boolean>(
    false
  );

  const handlerOpenDialogRequestRejected = () => {
    setIsOpenDialogRejected(!isOpenDialogRejected);
  };

  const handlerOpenDialogRequestRevision = () => {
    setIsOpenDialogRevision(!isOpenDialogRevision);
  };

  return (
    <div className="details-footer-buttons">
      {loading ? (
        <Button disabled>
          <LoaderWithBackdrop loading={true} whiteTheme={true} size={25} />
        </Button>
      ) : (
        buttons.map((button, index) => (
          <Button
            {...button}
            key={index}
            disabled={attachmentsDocs.loading || attachmentsMeeting.loading}
          />
        ))
      )}
      <DialogRequestRejected
        isOpenDialog={isOpenDialogRejected}
        handlerCloseDialog={handlerOpenDialogRequestRejected}
      />
      <DialogRequestRevision
        isOpenDialog={isOpenDialogRevision}
        handlerCloseDialog={handlerOpenDialogRequestRevision}
      />
    </div>
  );
});
