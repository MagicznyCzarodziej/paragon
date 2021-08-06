import { login } from 'api/auth';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'hooks/useMe';
import { TextField, Button } from '@material-ui/core';
import { useStyles } from './Login.styles';

export const Login = () => {
  const { t } = useTranslation(['authentication', 'errors']);
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login: loginAction, isLoggedIn } = useMe();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await login(username, password);

            setError(null);
            loginAction(response.token);
          } catch (error) {
            console.log(error.response);

            if (error.response?.status === 401) {
              const errorCode = error.response.data.error?.code || '';
              const errorMessage = t([errorCode, 'errors:GENERIC']);
              setError(errorMessage);
            } else {
              console.error(error);
              setError(t('errors:GENERIC') + error);
            }
          }
        }}
      >
        <TextField
          variant="outlined"
          name="username"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          InputProps={{ className: classes.input }}
        />
        <TextField
          variant="outlined"
          name="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          InputProps={{ className: classes.input }}
        />
        <Button type="submit" variant="outlined">
          {t('authentication: login')}
        </Button>
      </form>
      {error} <br />
    </div>
  );
};
