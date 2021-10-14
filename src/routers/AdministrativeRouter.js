import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Routes from "../constants/routes";
import NotFoundPage from "../pages/NotFoundPage";
import Loading from "../components/Loading";

const loadableOptions = { fallback: <Loading /> };

const AsyncIndex = loadable(() => import("../pages/Index"), loadableOptions);
const AsyncLogin = loadable(() => import("../pages/Login"), loadableOptions);
const AsyncForgetPassword = loadable(
  () => import("../pages/ForgetPassword"),
  loadableOptions
);

const AsyncHome = loadable(() => import("../pages/HomePage"), loadableOptions);

const AsyncAdministrativePanel = loadable(
  () => import("../pages/AdministrativePanelPage"),
  loadableOptions
);

const AsyncLogout = loadable(() => import("../pages/Logout"), loadableOptions);

/**
 * Este es el componente que se encarga de renderizar el componente adecuado
 * de acuerdo a la ruta en la que se encuentra el navegador.
 * <Switch> https://reactrouter.com/web/api/Switch
 * <PublicRoute> Utilizado para las páginas que son accesibles por todos los usuarios.
 * <PrivateRoute> Utilizado para lás páginas que son protegidas,
 *                este componente valida si existe una sesión activa.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AdministrativeRouter = () => (
  <Switch>
    <PublicRoute exact path={Routes.INDEX} component={AsyncIndex} />
    <PublicRoute path={Routes.LOGIN} component={AsyncLogin} />

    <PrivateRoute path={Routes.HOME} component={AsyncHome} />
    <PrivateRoute
      path={Routes.ADMINISTRATIVE_PANEL}
      component={AsyncAdministrativePanel}
    />
    <PublicRoute
      path={Routes.FORGET_PASSWORD}
      component={AsyncForgetPassword}
    />
    <PrivateRoute path={Routes.LOGOUT} component={AsyncLogout} />

    <Route component={NotFoundPage} />
  </Switch>
);

export default AdministrativeRouter;
