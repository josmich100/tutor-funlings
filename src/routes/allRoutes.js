// Profile
import UserProfile from "pages/Authentication/user-profile";

// Authentication related pages
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import Register from "pages/Authentication/Register";
import ForgetPwd from "pages/Authentication/ForgetPassword";
import Activation from "pages/Authentication/Activation";
import NewPassword from "pages/Authentication/NewPassword";
import Start from "pages/Authentication/Start";

// Dashboard
// import Dashboard from "pages/Dashboard/Dashboard";
// import ContactUs from "pages/Dashboard/ContactUs";
// import AdvertDetails from "pages/Dashboard/AdvertDetails";
// import FAQs from "pages/Dashboard/FAQs";
import Pages404 from "pages/Dashboard/Page404";
import Dashboard from "pages/Dashboard";
// import StoreDetails from "pages/Dashboard/StoreDetails";
// import VerifyNewEmail from "pages/Dashboard/VerifyNewEmail";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  // { path: "/contact", component: ContactUs },
  // { path: "/details/:id", component: AdvertDetails },
  // { path: "/faqs", component: FAQs },
  // { path: "/store", component: StoreDetails },
  // { path: "/profile", component: UserProfile },
  // { path: "/verifyNewEmail", component: VerifyNewEmail },
  { path: "", component: Pages404 },

  // this route should be at the end of all other routes
  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
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
