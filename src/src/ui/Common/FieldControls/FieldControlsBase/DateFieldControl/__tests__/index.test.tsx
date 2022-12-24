import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {DateFieldControl, DateFieldControlProps} from '../DateFieldControl';
import {format, parse} from 'date-fns';

const dateFieldControlProps: DateFieldControlProps = {
  placeholder: 'dateFieldControlTest',
  onChange: (date: Date | null, name?: string | null) => {},
};

const testName = 'DateFieldControl test';
const testValue1 = '01.01.2021';
const testValue2 = new Date();

test(testName, () => {
  const {rerender, getByPlaceholderText} = render(
    <DateFieldControl {...dateFieldControlProps} />
  );

  let input = getByPlaceholderText(
    dateFieldControlProps.placeholder as string
  ) as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange testValue1
  dateFieldControlProps.onChange = (date: Date | null) => {
    expect(date).toStrictEqual(parse(testValue1, 'dd.MM.yyyy', new Date()));
    rerender(<DateFieldControl {...dateFieldControlProps} value={date} />);
  };
  rerender(<DateFieldControl {...dateFieldControlProps} />);
  fireEvent.change(input, {target: {value: testValue1}});
  expect(input.value).toBe(testValue1);

  // test onChange testValue2
  dateFieldControlProps.onChange = (date: Date | null) => {
    const testDate = testValue2;
    testDate.setHours(0, 0, 0, 0);
    expect(date).toStrictEqual(testDate);
    rerender(<DateFieldControl {...dateFieldControlProps} value={date} />);
  };
  rerender(<DateFieldControl {...dateFieldControlProps} />);
  fireEvent.change(input, {target: {value: format(testValue2, 'dd.MM.yyyy')}});
  expect(input.value).toBe(format(testValue2, 'dd.MM.yyyy'));
});
