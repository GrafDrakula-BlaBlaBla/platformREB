import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  DateYearFieldControl,
  DateYearFieldControlProps,
} from '../DateYearFieldControl';

const dateYearFieldControlProps: DateYearFieldControlProps = {
  placeholder: 'dateYearFieldControlTest',
  onChange: (year?: number, name?: string | null) => {},
};

const testName = 'DateYearFieldControl test';
const testValue1 = '2021';
const testValue2 = 2022;

test(testName, () => {
  const {rerender, getByPlaceholderText} = render(
    <DateYearFieldControl {...dateYearFieldControlProps} />
  );

  let input = getByPlaceholderText(
    dateYearFieldControlProps.placeholder as string
  ) as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange testValue1
  dateYearFieldControlProps.onChange = (year?: number) => {
    expect(year).toBe(Number(testValue1));
    rerender(
      <DateYearFieldControl {...dateYearFieldControlProps} value={year} />
    );
  };
  rerender(<DateYearFieldControl {...dateYearFieldControlProps} />);
  fireEvent.change(input, {target: {value: testValue1}});
  expect(input.value).toBe(testValue1);

  // test onChange testValue2
  dateYearFieldControlProps.onChange = (year?: number) => {
    expect(year).toBe(testValue2);
    rerender(
      <DateYearFieldControl {...dateYearFieldControlProps} value={year} />
    );
  };
  rerender(<DateYearFieldControl {...dateYearFieldControlProps} />);
  fireEvent.change(input, {target: {value: testValue2}});
  expect(input.value).toBe(String(testValue2));
});
