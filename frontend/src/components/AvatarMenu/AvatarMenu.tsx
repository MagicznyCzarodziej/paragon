import React from 'react';

import { useStyles } from './AvatarMenu.styles';
import { Avatar } from '@material-ui/core';

export const AvatarMenu = () => {
  const classes = useStyles();

  return (
    <Avatar
      className={classes.avatarMenu}
      alt="avatar"
      src="https://i.pravatar.cc/300"
    />
  );
};
