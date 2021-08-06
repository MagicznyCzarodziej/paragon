import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  avatarMenu: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    boxShadow: theme.shadows['10'],

    // zIndex: 1000,
  },
}));
