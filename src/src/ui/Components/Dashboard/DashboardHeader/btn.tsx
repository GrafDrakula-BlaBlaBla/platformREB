import {Button} from '../../../Common/SimpleComponents/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';

const Btn = () => (
  <Button
    variant="contained"
    color="blue"
    startIcon={<GetAppIcon />}
    className="btn__backward"
  >
    Экспорт в PDF
  </Button>
);

export default Btn;
