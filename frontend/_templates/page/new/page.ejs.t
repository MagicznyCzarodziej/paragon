---
to: src/pages/<%= name %>/<%= name %>.tsx
---
import { useTranslation } from 'react-i18next';

import { useStyles } from './<%= name %>.styles';

export const <%= name %> = () => {
  const { t } = useTranslation('<%= name.toLowerCase() %>');
  const classes = useStyles();

  return (

  );
};
