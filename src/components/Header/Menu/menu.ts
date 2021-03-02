import authRoutes from '../../../routes/Routes/AuthRoutes';

const menuDashBoard = {
  label: 'DashBoard',
  path: '/',
};

const menuCursos = {
  label: 'Cursos',
  path: authRoutes.courses,
};

const menuDisciplinas = {
  label: 'Disciplinas',
  path: authRoutes.disciplines,
};

const menuAulas = {
  label: 'Aulas',
  path: authRoutes.classesForm,
};

const menuCompras = {
  label: 'Anos Letivos',
  path: authRoutes.paymentsDashboards,
};

const userMenu = {
  menuSuperAdmins: [
    menuDashBoard,
    menuCursos,
    menuDisciplinas,
    menuAulas,
    menuCompras,
  ],
  menuAdmins: [menuDashBoard, menuCursos, menuDisciplinas, menuAulas],
  menuUsers: [
    menuDashBoard,
    menuCursos,
    menuDisciplinas,
    menuAulas,
    menuCompras,
  ],
  menuStudent: [menuDashBoard, menuCompras],
  menuTeacher: [menuDashBoard, menuAulas],
};

export default userMenu;
