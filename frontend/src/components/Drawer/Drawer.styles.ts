import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  drawer: {},
  drawerContent: {
    width: 300,
    padding: theme.spacing(2),
  },
  menuItems: {
    flexGrow: 1,
  },
  version: {
    paddingTop: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.grey[400],
  },
}));
