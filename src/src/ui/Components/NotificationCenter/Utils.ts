import {Router, State} from 'router5';
import {EMessageType, ENotificationType} from '../../../Model/Messages';

/**
 * Управляем переключением параметров URL.
 */
export function sectionsAndTabsManaging(
  router: Router,
  route: State,
  routerConst: any
) {
  if (!route.params.section) {
    router.navigate(routerConst.NOTIFICATION_CENTER.name, {
      section: ENotificationType.MESSAGE,
    });
  }

  if (route.params.section === ENotificationType.EVENTS && !!route.params.tab) {
    router.navigate(routerConst.NOTIFICATION_CENTER.name, {
      section: ENotificationType.EVENTS,
    });
  }

  if (route.params.section === ENotificationType.MESSAGE && !route.params.tab) {
    router.navigate(routerConst.NOTIFICATION_CENTER.name, {
      section: ENotificationType.MESSAGE,
      tab: EMessageType.INBOX,
    });
  }
}
