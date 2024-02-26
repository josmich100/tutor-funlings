import mockups from "assets/images/mockups.png";
import rounded_ngamia from "assets/images/rounded_ngamia.png";
import profileImg from "assets/images/profile-img.png";

// VALUES
const version = "Version 1.0.0";
const copyright = `© ${new Date().getFullYear()} Funlings Entertainment Ltd.`;

// IMAGES
const auth_bgimage = profileImg;
const main_logo = require("../assets/images/logo.png");
const main_logo_Round = require("../assets/images/logo.png");
const marquee_App = require("../assets/images/logo.png");
const ngamia_advert =
  "https://res.cloudinary.com/dv1esm0pi/image/upload/f_auto/v1635503300/Marquee/General%20QA/Marquee-Advert_rv9nfq.svg";
const poweredBy_logo =
  "https://res.cloudinary.com/dd9cekgyu/image/upload/f_auto/v1633702378/Global%20Icons/resources/powered_onfaci_ksfltm.svg";
const empty_State =
  "https://res.cloudinary.com/dd9cekgyu/image/upload/f_auto/v1633702377/Global%20Icons/resources/data-image_vc4her_s0bwgj.svg";
const page_404 =
  "https://res.cloudinary.com/dd9cekgyu/image/upload/f_auto/v1633702378/Global%20Icons/resources/error-img_fwenf2_bjmdff.svg";
const app_store_badge =
  "https://res.cloudinary.com/dv1esm0pi/image/upload/f_auto/v1654756160/Ngamia%20Logos/Marquee/app-store-badge_q2x4dz.svg";
const google_play_badge =
  "https://res.cloudinary.com/dv1esm0pi/image/upload/f_auto/v1654756166/Ngamia%20Logos/Marquee/google-play-badge_y9afxi.svg";

// carouselImages
// const carousel1 = "https://res.cloudinary.com/dv1esm0pi/image/upload/f_auto/v1645687364/Marquee/Authentication/slider-1_d7ek47.svg"
const carousel1 = require("../assets/images/logo.png");
// const carousel2 = "https://res.cloudinary.com/dv1esm0pi/image/upload/f_auto/v1645687232/Marquee/Authentication/Marquee_Screens_l7f2fx.svg"
const carousel2 = mockups;
const carousel3 = require("../assets/images/logo.png");

export default {
  // VALUES
  version,
  copyright,
  // IMAGES
  main_logo,
  main_logo_Round,
  marquee_App,
  ngamia_advert,
  auth_bgimage,
  poweredBy_logo,
  empty_State,
  page_404,
  app_store_badge,
  google_play_badge,
  carousel1,
  carousel2,
  carousel3,
};
