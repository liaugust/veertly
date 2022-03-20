import { Alert as MuiAlert, AlertTitle } from '@mui/material';
import { capitalizeString } from '../../helpers';

interface AlertProps {
  type?: 'error' | 'success';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'error', message }) => {
  const capitalizedType = capitalizeString(type);

  return (
    <MuiAlert severity={type}>
      <AlertTitle>{capitalizedType}</AlertTitle>
      {message}
    </MuiAlert>
  );
};
