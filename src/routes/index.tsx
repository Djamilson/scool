import React from 'react';
import { Switch } from 'react-router-dom';

import Courses from '../pages/Courses';
import AddDisciplines from '../pages/Courses/AddDisciplines';
import CourseDisciplines from '../pages/Courses/AddDisciplines/ListDisciplineCourse';
import EditCoursesImage from '../pages/Courses/EditImage';
import NewCourses from '../pages/Courses/NewCourse';
import Dashboard from '../pages/Dashboard';
import Disciplines from '../pages/Disciplines';
import NewDisciplines from '../pages/Disciplines/NewDiscipline';
import Home from '../pages/Home';
import Addresses from '../pages/MyAccount/Address';
import AddressForm from '../pages/MyAccount/Address/AddressForm';
import Avatar from '../pages/MyAccount/Avatar';
import Documents from '../pages/MyAccount/Documents';
import Orders from '../pages/MyAccount/Order';
import Passwords from '../pages/MyAccount/Password';
import Phones from '../pages/MyAccount/Phone';
import Profile from '../pages/MyAccount/Profile';
import OrderCourses from '../pages/Payment/OrderCourses';
import PaymentDashboard from '../pages/Payment/PaymentDashboard';
import InitPayment from '../pages/Payment/PaymentDashboard/InitPayment';
import DataForm from '../pages/Payment/PaymentDashboard/InitPayment/DataForm';
import MessagePayment from '../pages/Payment/PaymentDashboard/InitPayment/MessagePayment';
import Study from '../pages/Study';
import Classes from '../pages/Study/Classes';
import ClassesForm from '../pages/Study/Classes/Form';
import DisciplineThemes from '../pages/Study/DisciplineThemes';
import ForgotPassword from '../pages/User/Login/ForgotPassword';
import ResetPassword from '../pages/User/Login/ResetPassword';
import SigIn from '../pages/User/Login/SignIn';
import SignUp from '../pages/User/SignUp';
import Route from './Route';
import authRoutes from './Routes/AuthRoutes';
import userRoles from './Routes/UserRoles';

const Routes: React.FC = () => (
  <Switch>
    <Route path={authRoutes.home} exact component={Home} />
    <Route path={authRoutes.signin} exact component={SigIn} />
    <Route path={authRoutes.signup} component={SignUp} />

    <Route path={authRoutes.forgotPassword} component={ForgotPassword} />
    <Route path={authRoutes.resetPassword} component={ResetPassword} />

    <Route
      path="/"
      exact
      component={Dashboard}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.dashboard}
      exact
      component={Dashboard}
      isPrivate
      requiredRoles={userRoles.all}
    />

    <Route
      path={authRoutes.profile}
      exact
      component={Profile}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.documents}
      exact
      component={Documents}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.avatar}
      exact
      component={Avatar}
      isPrivate
      requiredRoles={userRoles.all}
    />

    <Route
      path={authRoutes.addressesNew}
      exact
      component={AddressForm}
      isPrivate
      requiredRoles={userRoles.all}
    />

    <Route
      path={authRoutes.addressesEditAddressId}
      exact
      component={AddressForm}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.paymentDashboardInitPaymentPhoneAddress}
      exact
      component={DataForm}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.courses}
      exact
      component={Courses}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />

    <Route
      path={authRoutes.studyCourse_id}
      exact
      component={Study}
      isPrivate
      requiredRoles={userRoles.roleStudent}
    />
    <Route
      path={authRoutes.disciplines}
      exact
      component={Disciplines}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />
    <Route
      path={authRoutes.disciplinesNew}
      exact
      component={NewDisciplines}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />

    <Route
      exact
      path={authRoutes.disciplinesDisciplineIdEdit}
      component={NewDisciplines}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />

    <Route
      path={authRoutes.addDisciplineCourseCourseId}
      exact
      component={AddDisciplines}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />
    <Route
      path={authRoutes.disciplinesThemesCourseDisciplineId}
      exact
      component={DisciplineThemes}
      isPrivate
      requiredRoles={userRoles.roleAdminRoleStudent}
    />
    <Route
      path={authRoutes.classesForm}
      exact
      component={ClassesForm}
      isPrivate
      requiredRoles={userRoles.roleAdminsRoleTeacher}
    />
    <Route path={authRoutes.classes} exact component={Classes} isPrivate />

    <Route
      path={authRoutes.coursesNew}
      exact
      component={NewCourses}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />
    <Route
      exact
      path={authRoutes.coursesCourseIdEdit}
      component={NewCourses}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />
    <Route
      exact
      path={authRoutes.coursesCourseIdEditImage}
      component={EditCoursesImage}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      exact
      path={authRoutes.coursesDisciplinesCourseId}
      component={CourseDisciplines}
      isPrivate
      requiredRoles={userRoles.roleAdmins}
    />
    <Route
      exact
      isPrivate
      path={authRoutes.paymentsDashboardInitPaymentFinallySuccesses}
      component={MessagePayment}
      requiredRoles={userRoles.all}
    />
    <Route
      exact
      path={authRoutes.paymentsDashboardInitPaymentCourseId}
      component={InitPayment}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      exact
      path={authRoutes.paymentsDashboards}
      component={PaymentDashboard}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.ordersCoursesOrder_id}
      exact
      component={OrderCourses}
      isPrivate
      requiredRoles={userRoles.all}
    />

    <Route
      path={authRoutes.phones}
      exact
      component={Phones}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.addresses}
      exact
      component={Addresses}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.orders}
      exact
      component={Orders}
      isPrivate
      requiredRoles={userRoles.all}
    />
    <Route
      path={authRoutes.passwords}
      exact
      component={Passwords}
      isPrivate
      requiredRoles={userRoles.all}
    />
  </Switch>
);

export default Routes;
