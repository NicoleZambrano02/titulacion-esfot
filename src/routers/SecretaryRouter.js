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

const AsyncSecretaryProjectsList = loadable(
  () => import("../pages/SecretaryProjectsListPage"),
  loadableOptions
);
const AsyncForgetPassword = loadable(
  () => import("../pages/ForgetPassword"),
  loadableOptions
);
const AsyncSecretaryProjectDetail = loadable(() =>
  import("../pages/SecretaryProjectDetailPage")
);
const AsyncSecretaryCommitteeList = loadable(
  () => import("../pages/SecretaryCommitteeListPage"),
  loadableOptions
);
const AsyncSecretaryTeachersList = loadable(
  () => import("../pages/SecretaryTeachersListPage"),
  loadableOptions
);

const AsyncSecretaryStudentsList = loadable(
  () => import("../pages/SecretaryStudentsListPage"),
  loadableOptions
);

const AsyncAbout = loadable(
  () => import("../pages/AboutPage"),
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
const SecretaryRouter = () => (
  <Switch>
    <PublicRoute exact path={Routes.INDEX} component={AsyncIndex} />
    <PublicRoute path={Routes.LOGIN} component={AsyncLogin} />
    <PublicRoute
      path={Routes.FORGET_PASSWORD}
      component={AsyncForgetPassword}
    />

    <PrivateRoute path={Routes.HOME} component={AsyncHome} />
    <PrivateRoute
      path={Routes.PROJECTS_LIST_SECRETARY}
      component={AsyncSecretaryProjectsList}
    />
    <PrivateRoute
      path={Routes.PROJECT_DETAIL_SECRETARY}
      component={AsyncSecretaryProjectDetail}
    />

    <PrivateRoute
      path={Routes.SECRETARY_COMMITTEE_LIST}
      component={AsyncSecretaryCommitteeList}
    />

    <PrivateRoute
      path={Routes.SECRETARY_TEACHERS_LIST}
      component={AsyncSecretaryTeachersList}
    />

    <PrivateRoute
      path={Routes.SECRETARY_STUDENTS_LIST}
      component={AsyncSecretaryStudentsList}
    />

    <PrivateRoute path={Routes.LOGOUT} component={AsyncLogout} />
    <PublicRoute path={Routes.ABOUT} component={AsyncAbout} />

    <Route component={NotFoundPage} />
  </Switch>
);

export default SecretaryRouter;
