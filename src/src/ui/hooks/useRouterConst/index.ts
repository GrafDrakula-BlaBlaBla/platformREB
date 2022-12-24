import {useRouter} from 'react-router5';

export default function useRouterConst() {
  const router = useRouter();
  return router.getDependencies()?.routerConst;
}
