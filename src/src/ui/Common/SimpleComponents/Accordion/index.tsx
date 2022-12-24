import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import React, {FC, useState} from 'react';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface IProps {
  title: string;
  className?: string;
  footer?: boolean;
  footerButtons?: JSX.Element[];
  isExpanded?: boolean;
  onExpand?: () => void;
  error?: boolean;
}

export const AccordionContainer: FC<IProps> = (props) => {
  const {
    title,
    className,
    children,
    footer,
    footerButtons,
    isExpanded,
    onExpand,
    error,
  } = props;

  const [expanded, setExpanded] = useState<boolean>(Boolean(isExpanded));

  const cls = ClassNameInjection('accordion', {
    accordion_expanded: expanded,
    accordion_error: !!error,
    [`${className}`]: !!className,
  });

  const onChange = () => {
    if (onExpand) onExpand();
    setExpanded(!expanded);
  };

  return (
    <div className={cls}>
      <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary expandIcon={<ExpandMore />}>{title}</AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
        {(footer || footerButtons) && expanded ? (
          <div className="accordion__footer">
            {footerButtons ? (
              <div className="accordion__footer-buttons">
                {footerButtons?.map((btn) => btn)}
              </div>
            ) : null}
          </div>
        ) : null}
      </Accordion>
    </div>
  );
};
