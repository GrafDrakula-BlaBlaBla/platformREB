import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {ReactComponent as ExtFilter} from '../../../../../assets/svg/commonArea/ExtFilter.svg';
import {InputAdornment, Popover} from '@material-ui/core';
import {TableFilterSearch} from '../TableFilterSearch';
import {Button} from '../../../SimpleComponents/Button';
import {BadgePulse} from '../../../SimpleComponents/BadgePulse';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

export interface ITableFilterPopoverProps {
  name?: string;
  placeholder?: string;
  isApplied?: boolean;
  onCancel: () => void;
  onApply: () => void;
  className?: string;
  classNamePopover?: string;
}

export const TableFilterPopover: FC<ITableFilterPopoverProps> = observer(
  (props) => {
    const {
      name,
      placeholder = 'Расширенный поиск',
      isApplied,
      onCancel,
      onApply,
      children,
      className,
      classNamePopover,
    } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
    );
    const isPopoverOpen = Boolean(anchorEl);
    const onPopoverOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    };
    const onPopoverClose = () => {
      setAnchorEl(null);
    };

    const cls = ClassNameInjection(
      'table-filter-popover',
      className ? className : undefined
    );
    const clsPopover = ClassNameInjection(
      'table-filter-popover__popover',
      classNamePopover ? classNamePopover : undefined
    );

    return (
      <div className={cls}>
        <TableFilterSearch
          name={name}
          disabled={!Boolean(name)}
          placeholder={placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onPopoverOpen}
                  edge="end"
                  className={
                    isPopoverOpen ? 'table-filter-popover__btn_open' : undefined
                  }
                >
                  {isApplied ? (
                    <BadgePulse pulse={true}>
                      <ExtFilter />
                    </BadgePulse>
                  ) : (
                    <ExtFilter />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={onPopoverClose}
          className={clsPopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 50,
          }}
          transformOrigin={{
            vertical: -17,
            horizontal: 'right',
          }}
        >
          <div className="table-filter-popover__popover-content">
            {children}
          </div>
          <div className="table-filter-popover__popover-footer">
            <Button
              variant="outlined"
              color="default"
              size="medium"
              onClick={() => {
                onPopoverClose();
                onCancel();
              }}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              color="blue"
              size="medium"
              onClick={() => {
                onPopoverClose();
                onApply();
              }}
            >
              Применить
            </Button>
          </div>
        </Popover>
      </div>
    );
  }
);
