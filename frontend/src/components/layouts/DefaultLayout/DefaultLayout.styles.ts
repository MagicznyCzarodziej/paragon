import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
  },
  content: {
    overflowY: 'auto',
    position: 'relative',
  },
}));
