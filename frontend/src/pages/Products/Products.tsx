import { useTranslation } from 'react-i18next';

import { useStyles } from './Products.styles';
import { DefaultLayout } from 'components/layouts/DefaultLayout/DefaultLayout';

export const Products = () => {
  const { t } = useTranslation('products');
  const classes = useStyles();

  return <DefaultLayout headerTitle={t('headerTitle')}>Produkty</DefaultLayout>;
};
