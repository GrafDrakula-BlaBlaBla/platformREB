import React from 'react';
import useViewModel from '../../../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'react-router5';
import {Button, IButtonProps} from '../../../../Common/SimpleComponents/Button';
import {IAccreditationCommercialViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {ROUTER_CONST_CB} from '../../../../app/settings/routerConst/RouterConstCB';
import {EAccreditationStatuses} from '../../../../../Model/Accreditation';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import './index.less';

export const DetailsFooterButtons = observer(() => {
  const {
    item,
    send,
    acceptMeeting,
    loading,
    getCurrentItem,
    attachmentsDocs,
    attachmentsMeeting,
  } = useViewModel<IAccreditationCommercialViewModel>(VIEW_MODEL.Accreditation);
  const router = useRouter();

  const navigateTable = () =>
    router.navigate(ROUTER_CONST_CB.ACCREDITATION.fullName);

  const buttons: IButtonProps[] = [];
  if (item?.status === EAccreditationStatuses.CREATED) {
    buttons.push({
      onClick: () => send().then(getCurrentItem).then(navigateTable),
      children: 'Отправить',
    });
  }
  if (item?.status === EAccreditationStatuses.ON_REVISION) {
    buttons.push({
      onClick: () => send().then(getCurrentItem).then(navigateTable),
      children: 'Отправить',
    });
  }
  if (item?.status === EAccreditationStatuses.MEETING_CREATED) {
    buttons.push({
      onClick: () => acceptMeeting().then(getCurrentItem).then(navigateTable),
      children: 'Подтвердить встречу',
    });
  }
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
    </div>
  );
});
