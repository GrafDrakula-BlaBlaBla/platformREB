import React, {ReactNode} from 'react';
import {fireEvent, render, within} from '@testing-library/react';
import {
  MultiSelectFieldControl,
  MultiSelectFieldControlProps,
} from '../MultiSelectFieldControl';

const selectItems = [
  {
    label: 'Выберите значение',
    value: '',
  },
  {
    label: 'Администратор',
    value: 1,
  },
  {
    label: 'Менеджер',
    value: 2,
  },
  {
    label: 'Читатель',
    value: 3,
  },
];

const multiSelectFieldControlProps: MultiSelectFieldControlProps = {
  placeholder: 'multiSelectFieldControlTest',
  onChange: (
    e: React.ChangeEvent<{name?: string; value: unknown}>,
    child: ReactNode
  ) => {},
  items: selectItems,
};

const testName = 'MultiSelectFieldControl test';
const testValue1 = 3;
const testValue2 = 2;
const testLabel1 = /читатель/i;
const testLabel2 = /менеджер/i;

test(testName, () => {
  const {getByRole, getByPlaceholderText, rerender} = render(
    <MultiSelectFieldControl {...multiSelectFieldControlProps} />
  );

  const input = getByPlaceholderText(
    multiSelectFieldControlProps.placeholder as string
  ) as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange testValue1
  multiSelectFieldControlProps.onChange = (
    e: React.ChangeEvent<{name?: string; value: unknown}>,
    child: ReactNode
  ) => {
    expect(e.target.value).toStrictEqual([testValue1]);
    rerender(
      <MultiSelectFieldControl
        {...multiSelectFieldControlProps}
        value={e.target.value as unknown[]}
      />
    );
  };
  rerender(<MultiSelectFieldControl {...multiSelectFieldControlProps} />);
  fireEvent.mouseDown(getByRole('button'));
  const listbox = within(getByRole('listbox'));
  fireEvent.click(listbox.getByText(testLabel1));
  expect(input.value).toBe(String(testValue1));

  // test onChange [testValue1, testValue2]
  multiSelectFieldControlProps.value = [testValue1];
  multiSelectFieldControlProps.onChange = (
    e: React.ChangeEvent<{name?: string; value: unknown}>,
    child: ReactNode
  ) => {
    expect(e.target.value).toStrictEqual([testValue1, testValue2]);
    rerender(
      <MultiSelectFieldControl
        {...multiSelectFieldControlProps}
        value={e.target.value as unknown[]}
      />
    );
  };
  rerender(<MultiSelectFieldControl {...multiSelectFieldControlProps} />);
  fireEvent.click(listbox.getByText(testLabel2));
  expect(input.value).toBe(`${testValue1},${testValue2}`);
});
