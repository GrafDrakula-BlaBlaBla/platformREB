import React, {FC} from 'react';
import {TextFieldControl} from '../../FieldControls';
import {Button} from '../../SimpleComponents/Button';
import './index.less';

interface IProps {
  value: string;
  textLength: number;
  rows: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

export const MAX_TEXT_LENGTH = 1000;

export const DiscussionControl: FC<IProps> = ({
  value,
  textLength,
  rows,
  onChange,
  onSend,
}) => {
  return (
    <div className="discussion-control">
      <div className="discussion-control__input-wrapper">
        <TextFieldControl
          inputProps={{maxLength: MAX_TEXT_LENGTH}}
          multiline
          rows={rows}
          onChange={onChange}
          className="discussion-control__input"
          placeholder="Введите текст сообщения"
          rowsMax={10}
          value={value}
        />
        <div className="discussion-control__counter">
          {textLength}/{MAX_TEXT_LENGTH}
        </div>
      </div>
      <Button
        className={`${!!value && 'blue'} discussion-control__send`}
        onClick={() => {
          onSend();
        }}
      >
        Опубликовать
      </Button>
    </div>
  );
};
