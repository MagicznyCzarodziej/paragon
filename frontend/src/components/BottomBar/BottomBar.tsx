import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  ViewListOutlined,
  ShoppingCartOutlined,
  CategoryOutlined,
} from '@material-ui/icons';
import { useStyles } from './BottomBar.styles';

export const BottomBar = () => {
  const { t } = useTranslation('navigation');
  const { path } = useRouteMatch();
  const history = useHistory();

  const classes = useStyles();
  const value = path.slice(1);
  const handleChange = (event, value) => {
    history.push(value);
  };

  return (
    <BottomNavigation
      className={classes.bottomBar}
      value={value}
      onChange={handleChange}
      showLabels
    >
      <BottomNavigationAction
        className={classes.navigationItem}
        label={t('label.products')}
        value="products"
        icon={<ViewListOutlined />}
      />
      <BottomNavigationAction
        className={classes.navigationItem}
        label={t('label.categories')}
        value="categories"
        icon={<CategoryOutlined />}
      />
      <BottomNavigationAction
        className={classes.navigationItem}
        label={t('label.entries')}
        value="entries"
        icon={<ShoppingCartOutlined />}
      />
    </BottomNavigation>
  );
};
