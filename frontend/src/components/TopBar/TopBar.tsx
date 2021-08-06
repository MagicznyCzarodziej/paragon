import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppBar, Avatar, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import { useMe } from 'hooks/useMe';
import { useStyles } from './TopBar.styles';

interface Props {
  headerTitle?: string;
  setDrawer: (action: string) => void;
}

export const TopBar: React.FC<Props> = ({
  children,
  headerTitle,
  setDrawer,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('navigation');
  const { username } = useMe();

  return (
    <AppBar position="static" className={classes.topBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            setDrawer('toggle');
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* <span className={classes.title}>{headerTitle}</span> */}
        <div className={classes.username}>
          {t('welcome')} {username}
        </div>
        <Avatar
          className={classes.avatar}
          alt="avatar"
          src="/avatarPlaceholder.png"
          // src="https://i.pravatar.cc/300"
        ></Avatar>
      </Toolbar>
    </AppBar>
  );
};
