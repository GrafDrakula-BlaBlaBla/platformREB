import React, {FC} from 'react';
import './index.less';

interface IProps {
  value: string;
  draftExt: boolean;
}

export const WrapperRequestId: FC<IProps> = ({value, draftExt}) => {
  return (
    <>
      {value}&nbsp;
      {draftExt ? <span className="have-draft">(Ред.)</span> : null}
    </>
  );
};
