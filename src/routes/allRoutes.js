// Profile
import UserProfile from "pages/Authentication/user-profile";

// Authentication related pages
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import ForgetPwd from "pages/Authentication/ForgetPassword";
import Start from "pages/Authentication/Start";

// Dashboard
// import Dashboard from "pages/Dashboard/Dashboard";
// import ContactUs from "pages/Dashboard/ContactUs";
// import AdvertDetails from "pages/Dashboard/AdvertDetails";
// import FAQs from "pages/Dashboard/FAQs";
import Pages404 from "pages/Dashboard/Page404";

import Home from "pages/HomeRoutes/Dashboard";
import Projects from "pages/HomeRoutes/Projects";
import Quizzes from "pages/HomeRoutes/Quizzes";
import Competitions from "pages/HomeRoutes/Competitions";
import Lessons from "pages/HomeRoutes/Lessons";
import Invite from "pages/HomeRoutes/Invite";
// import StoreDetails from "pages/Dashboard/StoreDetails";
// import VerifyNewEmail from "pages/Dashboard/VerifyNewEmail";

const userRoutes = [
  { path: "/dashboard", component: Home },
  { path: "/projects", component: Projects },
  { path: "/quizzes", component: Quizzes },
  { path: "/competitions", component: Competitions },
  { path: "/lessons", component: Lessons },
  { path: "/invite", component: Invite },
  { path: "", component: Pages404 },
];

const authRoutes = [
  { path: "/", component: Start },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/forgot-password", component: ForgetPwd },
  // { path: "/register", component: Register },
  //   { path: "/activation", component: Activation },
  //   { path: "/new-password", component: NewPassword },
];

export { userRoutes, authRoutes };
