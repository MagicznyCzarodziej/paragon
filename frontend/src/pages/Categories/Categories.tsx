import { useTranslation } from 'react-i18next';

import { useStyles } from './Categories.styles';
import { DefaultLayout } from 'components/layouts/DefaultLayout/DefaultLayout';

export const Categories = () => {
  const { t } = useTranslation('categories');
  const classes = useStyles();

  return <DefaultLayout>Kategorie</DefaultLayout>;
};
