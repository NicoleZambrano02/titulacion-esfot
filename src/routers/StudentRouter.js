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

const AsyncHome = loadable(() => import("../pages/HomePage"), loadableOptions);
const AsyncForgetPassword = loadable(
  () => import("../pages/ForgetPassword"),
  loadableOptions
);
const AsyncAbout = loadable(
  () => import("../pages/AboutPage"),
  loadableOptions
);
const AsyncLogout = loadable(() => import("../pages/Logout"), loadableOptions);
const AsyncPlanForm = loadable(
  () => import("../pages/PlanFormPage"),
  loadableOptions
);
const AsyncProjectUpload = loadable(
  () => import("../pages/StudentProjectUploadPage"),
  loadableOptions
);

const AsyncTeacherIdeasList = loadable(
  () => import("../pages/TeacherIdeasPage"),
  loadableOptions
);

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
const StudentRouter = () => (
  <Switch>
    <PublicRoute exact path={Routes.INDEX} component={AsyncIndex} />
    <PublicRoute path={Routes.LOGIN} component={AsyncLogin} />

    <PrivateRoute path={Routes.HOME} component={AsyncHome} />
    <PrivateRoute path={Routes.PLAN_FORM} component={AsyncPlanForm} />
    <PrivateRoute path={Routes.PROJECT_UPLOAD} component={AsyncProjectUpload} />

    <PrivateRoute path={Routes.LOGOUT} component={AsyncLogout} />
    <PublicRoute
      path={Routes.FORGET_PASSWORD}
      component={AsyncForgetPassword}
    />
    <PublicRoute
      path={Routes.TEACHERS_IDEAS}
      component={AsyncTeacherIdeasList}
    />
    <PublicRoute path={Routes.ABOUT} component={AsyncAbout} />

    <Route component={NotFoundPage} />
  </Switch>
);

export default StudentRouter;
