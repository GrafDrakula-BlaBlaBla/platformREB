import React, {ReactNode} from 'react';
import {fireEvent, render, within} from '@testing-library/react';
import {
  SelectFieldControl,
  SelectFieldControlProps,
} from '../SelectFieldControl';

const SelectList = [
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

const selectFieldControlProps: SelectFieldControlProps = {
  placeholder: 'selectFieldControlTest',
  onChange: (
    e: React.ChangeEvent<{name?: string; value: unknown}>,
    child: ReactNode
  ) => {},
  items: SelectList,
  value: '',
};

const testName = 'SelectFieldControl test';
const testValue = 3;
const testLabel = /читатель/i;

test(testName, () => {
  const {getByRole, getByPlaceholderText, rerender} = render(
    <SelectFieldControl {...selectFieldControlProps} />
  );

  const input = getByPlaceholderText(
    selectFieldControlProps.placeholder as string
  ) as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange
  selectFieldControlProps.onChange = (
    e: React.ChangeEvent<{name?: string; value: unknown}>,
    child: ReactNode
  ) => {
    expect(e.target.value).toBe(testValue);
    rerender(
      <SelectFieldControl {...selectFieldControlProps} value={e.target.value} />
    );
  };
  rerender(<SelectFieldControl {...selectFieldControlProps} />);
  fireEvent.mouseDown(getByRole('button'));
  const listbox = within(getByRole('listbox'));
  fireEvent.click(listbox.getByText(testLabel));
  expect(input.value).toBe(String(testValue));
});
