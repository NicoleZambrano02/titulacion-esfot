/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: "/ingreso",
  USERS: "/usuarios",
  USERS_ID: `/usuario/:id`,
  INDEX: "/",
  ABOUT: "/acerca-de",
  TEACHERS_IDEAS: "/ideas-profesores",
  REGISTER: "/registrar",
  FORGET_PASSWORD: "/olvide-mi-clave",
  RESET_PASSWORD: "/restablecer-clave",
};

const privateRoutes = {
  LOGOUT: "/logout",
  HOME: "/inicio",
  TEACHER_PANEL: "/panel-profesor",
  ADMINISTRATIVE_PANEL: "/panel-direccion",
  TEACHERS_PLANS: "/ingreso-ideas-profesor",
  PLAN_FORM: "/plan-titulacion",
  PROJECT_UPLOAD: "/subir-proyecto-titulacion",
  PROJECTS_LIST_SECRETARY: "/listado-proyectos",
  SECRETARY_COMMITTEE_LIST: "/listado-comisiones",
  SECRETARY_TEACHERS_LIST: "/listado-profesores",
  SECRETARY_STUDENTS_LIST: "/listado-estudiantes",
  COMMITTEE_PLANS: "/proyectos-comision",
  PROJECT_DETAIL_SECRETARY: "/detalle-proyecto",
  JURY_PROJECTS_LIST: "/proyectos-jurado",
  JURY_PROJECT_REVIEW: "/revision-proyecto",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
