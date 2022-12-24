import React from 'react';
import {useRoute} from 'react-router5';
import {EThreadMessageType} from '../../../../../../Model/Discussion/Model';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {IDiscussionComViewModel} from '../../../../../../ViewModel/viewModels/Discussion';
import {Discussion} from '../../../../../Common/Discussion';
import useViewModel from '../../../../../hooks/useViewModel';

export const CreditForAccreditiveChat = () => {
  const {
    route: {params},
  } = useRoute();

  const discussionViewModel = useViewModel<IDiscussionComViewModel>(
    VIEW_MODEL.Discussion
  );

  return (
    <Discussion
      viewModel={discussionViewModel}
      threadId={params.id}
      threadType={EThreadMessageType.CREDIT_FOR_ACCREDITIVE}
    />
  );
};
