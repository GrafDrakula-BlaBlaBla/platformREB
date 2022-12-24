import {cloneDeep} from './cloneDeep';

describe(' test clone Deep', () => {
  it('проверяем то, что клонирование работает', () => {
    const object = {
      number: 1,
      string: 'string',
      object: {
        object: {
          object: {
            string: 'string',
          },
        },
      },
    };
    const cloneObject = cloneDeep(object);
    expect(cloneObject).toEqual(object);
  });

  it('проверяем то, что это разные объекты/массивы', () => {
    const object = {
      number: 1,
      string: 'string',
      object: {
        stirng: 'string',
      },
    };

    const array = [
      {
        number: 1,
        string: 'string',
        object: {
          stirng: 'string',
        },
      },
      'string',
    ];

    const cloneObject = cloneDeep(object);
    const cloneArray = cloneDeep(array);

    expect(cloneObject).not.toBe(object);
    expect(cloneArray).not.toBe(array);
  });
});
