import { useTranslation } from 'react-i18next';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import { useStyles } from './Drawer.styles';
import { useMe } from 'hooks/useMe';

export const Drawer = ({ isOpen, setDrawer }) => {
  const classes = useStyles();

  const { t, i18n } = useTranslation('navigation');
  const { logout } = useMe();

  const otherLanguage = i18n.language === 'en' ? 'pl' : 'en';

  return (
    <SwipeableDrawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerContent,
      }}
      anchor={'left'}
      open={isOpen}
      onClose={() => {
        setDrawer('closed');
      }}
      onOpen={() => {
        setDrawer('open');
      }}
    >
      <List className={classes.menuItems}>
        <ListItem button>
          <ListItemText>:)</ListItemText>
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          onClick={() => {
            i18n.changeLanguage(otherLanguage);
          }}
        >
          <ListItemText>{t(`switchLanguage`)}</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            logout();
          }}
        >
          <ListItemText>{t('logout')}</ListItemText>
        </ListItem>
      </List>
      <Divider light />
      <div className={classes.version}>{t('version')} 0.1</div>
    </SwipeableDrawer>
  );
};
