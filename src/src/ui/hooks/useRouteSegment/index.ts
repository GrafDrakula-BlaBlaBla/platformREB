import {useRoute} from 'react-router5';

export default function useRouteSegment(): string {
  const {route} = useRoute();
  if (route) {
    return route.name.split('.')[0];
  }
  return '';
}
