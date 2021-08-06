import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  topBar: {},
  menuButton: {
    color: theme.palette.common.white,
  },
  username: {
    color: theme.palette.common.white,
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  title: {
    fontSize: 26,
  },
}));
