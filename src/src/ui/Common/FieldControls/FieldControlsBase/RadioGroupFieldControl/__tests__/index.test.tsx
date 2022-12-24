import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  RadioGroupFieldControl,
  RadioGroupFieldControlProps,
} from '../RadioGroupFieldControl';

const radioGroupItems = [
  {value: '1', label: 'Пункт 1'},
  {value: '2', label: 'Пункт 2'},
  {value: '3', label: 'Пункт 3'},
];

const radioGroupFieldControlProps: RadioGroupFieldControlProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  items: radioGroupItems,
};

const testName = 'RadioGroupFieldControl test';
const testValue = '2';

test(testName, () => {
  const {rerender, getByTestId} = render(
    <RadioGroupFieldControl
      {...radioGroupFieldControlProps}
      data-testid="radioGroupFieldControlTest"
    />
  );

  const radioGroup = getByTestId('radioGroupFieldControlTest');
  const checkedRadio = radioGroup.querySelectorAll(
    'input[type="radio"]:checked'
  );
  expect(checkedRadio).toHaveLength(0);

  // test onChange
  radioGroupFieldControlProps.onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    expect(e.target.value).toBe(testValue);
    rerender(
      <RadioGroupFieldControl
        {...radioGroupFieldControlProps}
        value={e.target.value}
      />
    );
  };
  rerender(<RadioGroupFieldControl {...radioGroupFieldControlProps} />);
  const radio = radioGroup.querySelector(
    `input[value="${testValue}"]`
  ) as HTMLInputElement;
  fireEvent.change(radio, {target: {checked: true}});
  expect(radio).toHaveProperty('checked', true);
});
