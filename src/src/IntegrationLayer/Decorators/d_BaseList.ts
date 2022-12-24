import {BaseListDTO} from '../../Model/BaseList';

export function d_BaseList(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) {
  const method = descriptor.value;
  if (typeof method === 'function') {
    descriptor.value = async function (...args: any[]) {
      const result = await method?.apply(this, args);
      return result || new BaseListDTO();
    };
  } else {
    return descriptor.value;
  }
}
