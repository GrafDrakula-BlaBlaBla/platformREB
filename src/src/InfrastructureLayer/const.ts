/**
 * Удаленное API доступное через ВПН и требующее реальной аутентификации в IAM.
 */
export const API_FROM_IAM =
  // 'https://backend.reb-dev.apps.solutions-nt.sbc.space/v1/vedreb';
  '/backtofront/v1/vedreb';

/**
 * Удаленное API c заглушкой вметсо аутентификации, необходимо для локальной разработки.
 */
export const LOCAL_API =
  // 'http://backend-hooitka-ingress-reb-dev.apps.ocp-public.sbercloud.ru/backtofront';
  // 'http://in-backend-test-reb-dev.apps.ocp-public.sbercloud.ru/backtofront';
  // 'http://10.9.191.9:8761/v1/vedreb';
  // 'http://localhost:8761/v1/vedreb';
  // 'https://backend.reb-dev.apps.solutions-nt.sbc.space/v1/vedreb';
  'https://backend.reb-dev.apps.ocp.business.tech/v1/vedreb';
