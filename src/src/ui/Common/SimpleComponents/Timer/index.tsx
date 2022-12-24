import React from 'react';
import {useState, useEffect} from 'react';
import {padStart} from '../../../../Utils/String/pad';

export interface ITimerProps {
  min: number;
  sec: number;
  format: string;
  finishedComponent: JSX.Element;
  restart: boolean;
}

export const Timer = (props: ITimerProps) => {
  const {min = 0, sec = 0, format, finishedComponent, restart} = props;
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(sec);
  let timer: NodeJS.Timeout;

  const go = () => {
    timer = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
      if (seconds === 0) {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    go();
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (restart) {
      setMinutes(min);
      setSeconds(sec);
    }
    // eslint-disable-next-line
  }, [restart]);

  const minStr = (min: number) => {
    return padStart(minutes.toString(), 2, '0');
  };
  const secStr = (sec: number) => {
    return padStart(seconds.toString(), 2, '0');
  };

  return (
    <div className="timer">
      {minutes === 0 && seconds === 0
        ? finishedComponent
        : format.replace(/mm:ss/, `${minStr(minutes)}:${secStr(seconds)}`)}
    </div>
  );
};
