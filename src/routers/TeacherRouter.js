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

const AsyncTeacherPanel = loadable(
  () => import("../pages/TeacherPanelPage"),
  loadableOptions
);
const AsyncTeachersIdeas = loadable(
  () => import("../pages/TeacherIdeasPage"),
  loadableOptions
);
const AsyncTeachersPlans = loadable(
  () => import("../pages/TeacherPlansPage"),
  loadableOptions
);
const AsyncForgetPassword = loadable(
  () => import("../pages/ForgetPassword"),
  loadableOptions
);
const AsyncCommitteePlans = loadable(
  () => import("../pages/CommitteePlansPage"),
  loadableOptions
);

const AsyncJuryProjectsList = loadable(
  () => import("../pages/JuryProjectListPage"),
  loadableOptions
);

const AsyncJuryProjectReview = loadable(
  () => import("../pages/JuryProjectReviewPage"),
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
const TeacherRouter = () => (
  <Switch>
    <PublicRoute exact path={Routes.INDEX} component={AsyncIndex} />
    <PublicRoute path={Routes.LOGIN} component={AsyncLogin} />
    <PublicRoute
      path={Routes.FORGET_PASSWORD}
      component={AsyncForgetPassword}
    />
    <PrivateRoute path={Routes.HOME} component={AsyncHome} />
    <PrivateRoute path={Routes.TEACHER_PANEL} component={AsyncTeacherPanel} />
    <PrivateRoute path={Routes.TEACHERS_IDEAS} component={AsyncTeachersIdeas} />
    <PrivateRoute path={Routes.TEACHERS_PLANS} component={AsyncTeachersPlans} />

    <PrivateRoute
      path={Routes.COMMITTEE_PLANS}
      component={AsyncCommitteePlans}
    />
    <PrivateRoute
      path={Routes.JURY_PROJECTS_LIST}
      component={AsyncJuryProjectsList}
    />
    <PrivateRoute
      path={Routes.JURY_PROJECT_REVIEW}
      component={AsyncJuryProjectReview}
    />

    <PrivateRoute path={Routes.LOGOUT} component={AsyncLogout} />
    <PublicRoute path={Routes.ABOUT} component={AsyncAbout} />

    <Route component={NotFoundPage} />
  </Switch>
);

export default TeacherRouter;
