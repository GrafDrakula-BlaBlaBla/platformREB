import {useRouter} from 'react-router5';
import {TMenuConfig} from '../../app/settings/menuConfig/MenuConfig';

export default function useMenuConfig(): TMenuConfig {
  const router = useRouter();
  return router.getDependencies()?.menuConfig;
}
