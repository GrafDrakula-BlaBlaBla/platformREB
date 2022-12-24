import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  CurrencyFieldControl,
  CurrencyFieldControlProps,
} from '../CurrencyFieldControl';

const currencyFieldControlProps: CurrencyFieldControlProps = {
  placeholder: 'CurrencyFieldControlTest',
  name: 'CurrencyFieldControlTest',
  value: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

const testName = 'CurrencyFieldControl test';
const testValue = 1000000;
const testValueExpected = '1 000 000';

test(testName, () => {
  const {rerender, getByPlaceholderText} = render(
    <CurrencyFieldControl {...currencyFieldControlProps} />
  );

  let input = getByPlaceholderText(
    currencyFieldControlProps.placeholder as string
  ) as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange
  currencyFieldControlProps.onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    expect(e.target.value).toBe(String(testValue));
    rerender(
      <CurrencyFieldControl
        {...currencyFieldControlProps}
        value={e.target.value}
      />
    );
  };
  rerender(<CurrencyFieldControl {...currencyFieldControlProps} />);
  fireEvent.change(input, {target: {value: testValue}});
  expect(input.value).toBe(testValueExpected);
});
