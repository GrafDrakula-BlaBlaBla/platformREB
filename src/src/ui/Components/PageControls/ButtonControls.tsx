import React from 'react';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';

export const ButtonControls = () => {
  return (
    <FormSection title="Buttons">
      <FormField title="1. Button outlined" align="left">
        <Button variant="outlined" disabled className="field-control">
          outlined disabled
        </Button>
        <Button variant="outlined" color="default" className="field-control">
          outlined default
        </Button>
        <Button variant="outlined" color="blue" className="field-control">
          outlined blue
        </Button>
        <Button variant="outlined" color="red" className="field-control">
          outlined red
        </Button>
        <Button variant="outlined" size="medium" className="field-control">
          outlined medium
        </Button>
        <Button variant="outlined" size="small" className="field-control">
          outlined small
        </Button>
      </FormField>
      <FormField title="2. Button contained" align="left">
        <Button variant="outlined" disabled className="field-control">
          contained disabled
        </Button>
        <Button variant="contained" color="default" className="field-control">
          contained default
        </Button>
        <Button variant="contained" color="blue" className="field-control">
          contained blue
        </Button>
        <Button variant="contained" color="red" className="field-control">
          contained red
        </Button>
        <Button variant="contained" size="medium" className="field-control">
          contained medium
        </Button>
        <Button variant="contained" size="small" className="field-control">
          contained small
        </Button>
      </FormField>
      <FormField title="3. Button text" align="left">
        <Button variant="text" disabled className="field-control">
          text disabled
        </Button>
        <Button variant="text" color="default" className="field-control">
          text default
        </Button>
        <Button variant="text" color="blue" className="field-control">
          text blue
        </Button>
        <Button variant="text" color="red" className="field-control">
          text red
        </Button>
        <Button variant="text" size="medium" className="field-control">
          text medium
        </Button>
        <Button variant="text" size="small" className="field-control">
          text small
        </Button>
      </FormField>
    </FormSection>
  );
};
