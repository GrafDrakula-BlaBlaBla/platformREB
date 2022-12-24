import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  DateIntervalFieldControl,
  DateIntervalFieldControlProps,
  IDateIntervalValue,
} from '../DateIntervalFieldControl';
import {format} from 'date-fns';

const dateIntervalFieldControlProps: DateIntervalFieldControlProps = {
  onChange: (value: IDateIntervalValue, name?: string | null) => {},
};

const testName = 'DateIntervalFieldControl test';
const testValue: IDateIntervalValue = {
  start: new Date(),
  end: new Date(),
};
const start = testValue.start;
if (start) start.setHours(0, 0, 0, 0);
testValue.end?.setHours(0, 0, 0, 0);

test(testName, () => {
  const {rerender, getAllByTestId} = render(
    <DateIntervalFieldControl
      {...dateIntervalFieldControlProps}
      data-testid="DateIntervalFieldControlTest"
    />
  );

  const controls = getAllByTestId('DateIntervalFieldControlTest');
  const inputStart = controls[0].querySelector(
    'input[type="text"]'
  ) as HTMLInputElement;
  const inputEnd = controls[1].querySelector(
    'input[type="text"]'
  ) as HTMLInputElement;
  expect(inputStart.value).toBe('');
  expect(inputEnd.value).toBe('');

  // test start date
  dateIntervalFieldControlProps.onChange = (value: IDateIntervalValue) => {
    expect(value.start).toStrictEqual(testValue.start);
    expect(value.end).toBeUndefined();
    dateIntervalFieldControlProps.value = value;
    rerender(<DateIntervalFieldControl {...dateIntervalFieldControlProps} />);
  };
  rerender(<DateIntervalFieldControl {...dateIntervalFieldControlProps} />);
  fireEvent.change(inputStart, {
    target: {value: format(testValue.start as Date, 'dd.MM.yyyy')},
  });
  expect(inputStart.value).toBe(format(testValue.start as Date, 'dd.MM.yyyy'));

  // test end date
  dateIntervalFieldControlProps.onChange = (value: IDateIntervalValue) => {
    expect(value.start).toStrictEqual(testValue.start);
    expect(value.end).toStrictEqual(testValue.end);
    dateIntervalFieldControlProps.value = value;
    rerender(<DateIntervalFieldControl {...dateIntervalFieldControlProps} />);
  };
  rerender(<DateIntervalFieldControl {...dateIntervalFieldControlProps} />);
  fireEvent.change(inputEnd, {
    target: {value: format(testValue.end as Date, 'dd.MM.yyyy')},
  });
  expect(inputEnd.value).toBe(format(testValue.end as Date, 'dd.MM.yyyy'));
});
