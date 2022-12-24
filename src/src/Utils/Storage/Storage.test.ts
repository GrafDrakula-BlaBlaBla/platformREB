import {SStorage, LStorage} from './';

const TestObj: Record<string, any> = {
  city: 'Moscow',
  street: 'Yaroslavskaya',
  house: 3,
  appartment: 123,
};

describe('Storage test', () => {
  it('SStorage test', () => {
    SStorage.address = TestObj;
    Object.keys(SStorage.address).forEach((key) => {
      expect(SStorage.address[key]).toEqual(TestObj[key]);
    });

    expect(SStorage.fn).toBeNull();

    SStorage.arr = [1, 2, 3, 4];
    expect(SStorage.arr).toEqual([1, 2, 3, 4]);

    SStorage.name = 'Ivan';
    expect(SStorage.name).toEqual('Ivan');
  });

  it('LStorage test', () => {
    LStorage.address = TestObj;
    Object.keys(LStorage.address).forEach((key) => {
      expect(LStorage.address[key]).toEqual(TestObj[key]);
    });

    expect(LStorage.fn).toBeNull();

    LStorage.arr = [1, 2, 3, 4];
    expect(LStorage.arr).toEqual([1, 2, 3, 4]);

    LStorage.name = 'Ivan';
    expect(LStorage.name).toEqual('Ivan');
  });
});
