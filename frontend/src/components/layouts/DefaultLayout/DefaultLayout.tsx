import React, { useState } from 'react';

import { useStyles } from './DefaultLayout.styles';
import { BottomBar } from 'components/BottomBar/BottomBar';
import { TopBar } from 'components/TopBar/TopBar';
import { Drawer } from 'components/Drawer/Drawer';

interface Props {
  headerTitle?: string;
}

export const DefaultLayout: React.FC<Props> = ({ children, headerTitle }) => {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const setDrawer = (action) => {
    console.log(action);

    if (action === 'open') setIsDrawerOpen(true);
    else if (action === 'closed') setIsDrawerOpen(false);
    else if (action === 'toggle') setIsDrawerOpen((state) => !state);
  };

  return (
    <div className={classes.container}>
      <TopBar headerTitle={headerTitle} setDrawer={setDrawer} />
      <div className={classes.content}>
        <Drawer isOpen={isDrawerOpen} setDrawer={setDrawer} />
        <div>{children}</div>
      </div>
      <BottomBar />
    </div>
  );
};
