import React from "react";
import Loading from "../components/Loading";
import TeacherRouter from "./TeacherRouter";
import SecretaryRouter from "./SecretaryRouter";
import AuthRouter from "./AuthRouter";
import { useAuth } from "../providers/Auth";
import StudentRouter from "./StudentRouter";
import AdministrativeRouter from "./AdministrativeRouter";

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
const AppRouter = () => {
  const { currentUser, isCheckingAuth, isAuthenticated } = useAuth();

  return isCheckingAuth ? (
    <Loading />
  ) : !isAuthenticated ? (
    <AuthRouter />
  ) : currentUser.role === "ROLE_TEACHER" ? (
    <TeacherRouter />
  ) : currentUser.role === "ROLE_SECRETARY" ? (
    <SecretaryRouter />
  ) : currentUser.role === "ROLE_ADMIN" ? (
    <AdministrativeRouter />
  ) : (
    <StudentRouter />
  );
};

export default AppRouter;

/*

 <Switch>
 <PublicRoute exact path={Routes.INDEX} component={AsyncIndex} />
 <PublicRoute path={Routes.LOGIN} component={AsyncLogin} />

 <PrivateRoute path={Routes.HOME} component={AsyncHome} />
 <PrivateRoute path={Routes.TEACHER_PANEL} component={AsyncTeacherPanel} />
 <PrivateRoute
 path={Routes.TEACHERS_IDEAS}
 component={AsyncTeachersIdeas}
 />
 <PrivateRoute
 path={Routes.TEACHERS_PLANS}
 component={AsyncTeachersPlans}
 />

 <PrivateRoute
 path={Routes.PROJECTS_LIST_SECRETARY}
 component={AsyncSecretaryProjectsList}
 />
 <PrivateRoute
 path={Routes.PROJECT_DETAIL_SECRETARY}
 component={AsyncSecretaryProjectDetail}
 />

 <PrivateRoute
 path={Routes.COMMITTEE_PLANS}
 component={AsyncCommitteePlans}
 />

 <PrivateRoute path={Routes.PLAN_FORM} component={AsyncPlanForm} />

 <PrivateRoute path={Routes.LOGOUT} component={AsyncLogout} />
 <PublicRoute path={Routes.ABOUT} component={AsyncAbout} />

 <Route component={NotFoundPage} />
 </Switch>
 */
