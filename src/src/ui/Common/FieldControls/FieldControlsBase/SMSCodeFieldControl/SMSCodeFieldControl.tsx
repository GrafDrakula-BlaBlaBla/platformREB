import React, {
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  useState,
  useEffect,
} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {TModify} from '../../../../../Utils/TS/TModify';
import {FormControl, FormHelperText} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';
import {TextFieldControl} from '../TextFieldControl';
import {padEnd} from '../../../../../Utils/String/pad';

export interface SMSCodeFieldControlProps
  extends TModify<
    TextFieldProps,
    {
      value?: string;
      onChange?: (valueArray: string[], value: string, name?: string) => void;
      maxLength?: number;
      focus?: boolean;
    }
  > {}

export const defaultSMSCodeChar = '_';

export const isSMSCodeControlHasData = (value: string[]) => {
  return value.reduce((prev, curr) => {
    return prev || curr !== defaultSMSCodeChar;
  }, false);
};

export const SMSCodeFieldControl = (props: SMSCodeFieldControlProps) => {
  const {
    maxLength = 4,
    className,
    variant,
    value,
    onChange: changeHandler,
    type,
    error,
    helperText,
    label,
    placeholder,
    focus,
    ...other
  } = props;

  const cls = [
    'sms-code-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);

  const valueToState = (value?: string) =>
    padEnd(value || '', maxLength, defaultSMSCodeChar)
      .substr(0, maxLength)
      .split('') || [];

  const [state, setState] = useState<string[]>(valueToState(value));
  const [index, setIndex] = useState<number>(-1);
  const [hasData, setHasData] = useState<boolean>(
    isSMSCodeControlHasData(valueToState(value))
  );

  useUpdateEffect(() => {
    setState(valueToState(value));
    if (!value) focusFirst();
  }, [value]);

  useEffect(() => {
    if (focus) focusFirst();
    // eslint-disable-next-line
  }, []);

  const onChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    const stateArray = state;
    stateArray[index] = e.target.value || defaultSMSCodeChar;
    setState(stateArray);
    if (state[index] !== defaultSMSCodeChar) focusNext();
    if (state[index] === defaultSMSCodeChar) focusPrev();
    setHasData(isSMSCodeControlHasData(state));
    const value = state.join('');
    if (changeHandler) {
      changeHandler(state, value, props.name);
    }
  };

  useEffect(() => {
    setHasData(isSMSCodeControlHasData(state));
  }, [state]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Backspace' && state[index] === defaultSMSCodeChar)
      focusPrev(e);
    if (e.key === 'ArrowLeft') focusPrev(e);
    if (e.key === 'ArrowRight') focusNext(e);
    if (e.key === state[index] && e.key !== defaultSMSCodeChar) focusNext(e);
  };

  const onFocus = (
    e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    setIndex(index);
    e.target.setSelectionRange(0, 1);
  };

  const focusFirst = () => {
    setIndex(0);
  };
  const focusNext = (e?: KeyboardEvent<HTMLDivElement>) => {
    e?.preventDefault();
    setIndex(index === maxLength - 1 ? index : index + 1);
  };
  const focusPrev = (e?: KeyboardEvent<HTMLDivElement>) => {
    e?.preventDefault();
    setIndex(index === 0 ? index : index - 1);
  };

  return (
    <FormControl
      className={
        hasData
          ? cls.join(' ')
          : cls.concat(['field-control_no-data']).join(' ')
      }
    >
      <div className="sms-code-field-control__values">
        {[...Array(maxLength)].map((e, i) => (
          <TextFieldControl
            key={i}
            variant="outlined"
            regex={/^\d?$/}
            value={state[i] && state[i] !== defaultSMSCodeChar ? state[i] : ''}
            onChange={(e) => onChange(e, i)}
            onFocus={(e) => onFocus(e, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            inputProps={{maxLength: 1}}
            inputRef={(input) => i === index && input && input.focus()}
            error={!!error}
            {...other}
          />
        ))}
      </div>
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
