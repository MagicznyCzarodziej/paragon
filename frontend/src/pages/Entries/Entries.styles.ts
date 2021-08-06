import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  entriesTable: {
    padding: theme.spacing(1, 2),
  },
  addEntryButton: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(2),
    color: theme.palette.common.white,
  },
  addEntryButton__icon: {
    marginRight: theme.spacing(1),
  },
  arrowUp: {
    color: theme.palette.error.main,
  },
  arrowDown: {
    color: theme.palette.primary.main,
  },
}));
