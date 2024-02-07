import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertBody } from '../lib/definitions';

export default function MyAlert({ alertBody }: { alertBody: AlertBody | undefined}) {
  if (alertBody == undefined)
    return <></>
  return (
    <div>
      <Snackbar 
        open={alertBody.open} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}>
        <Alert
          severity={alertBody.alertType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertBody.alertMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
