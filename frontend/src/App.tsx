import React from 'react';
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteProps,
} from 'react-router-dom';
import { Login } from 'pages/Login/Login';
import { useMe } from 'hooks/useMe';
import { Entries } from 'pages/Entries/Entries';
import { AuthProvider } from 'contexts/AuthContext';
import { Products } from 'pages/Products/Products';
import { Categories } from 'pages/Categories/Categories';

const AuthRoute = (props: RouteProps) => {
  const { isLoggedIn, username, logout } = useMe();

  if (!isLoggedIn) return <Redirect to="/login" />;
  else return <Route {...props} />;
};

const Routes = () => {
  const { isLoggedIn } = useMe();

  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/products">
            <Products />
          </AuthRoute>
          <AuthRoute path="/categories">
            <Categories />
          </AuthRoute>
          <AuthRoute path="/entries">
            <Entries />
          </AuthRoute>

          <Route exact path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>

          <Route path="/">
            <Redirect to="/products" />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3cc768',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          backgroundColor: '#f5f5f5',
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
