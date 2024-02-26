import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Ngamia Powered by Logo
import DefaultValues from "constants/DefaultValues";

import ShareableUrl from "helpers/API/ShareableUrl";
import PromoterUrl from 'helpers/API/PromoterUrl';


const Footer = props => {

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return (
    <React.Fragment>
      <footer className="footer bg-primary">
        <Container fluid>
          <Row className='mt-3'>
            <Col
              xl={{ span: 3, order: 'first' }}
              lg={{ span: 8, order: 'first' }}
              md={{ span: 7, order: 'first' }}
            >
              <div className="footer-brand-box mb-3">
                <Link to="/dashboard" className="logo-footer logo-dark">
                  <span className="logo-sm">
                    <img
                      src={DefaultValues?.main_logo_Round}
                      alt=""
                      height="25px"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={DefaultValues?.main_logo}
                      alt=""
                      height="25px"
                    />
                  </span>
                </Link>

                <Link to="/dashboard" className="logo-footer logo-light">
                  <span className="logo-sm">
                    <img
                      src={DefaultValues?.main_logo_Round}
                      alt=""
                      height="25px"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={DefaultValues?.main_logo}
                      alt=""
                      height="25px"
                    />
                  </span>
                </Link>
              </div>
              <p className=''>
                Marquee Marketing is a strategy that seeks to connect with customers at an emotional level by using creative and engaging methods of promoting your product and brand.
              </p>
            </Col>

            <Col
              xl
              lg={{ span: 3, order: 3 }}
              md={{ span: 3, order: 3 }}
              xs={{ order: 3 }}
              className='ps-lg-2 pe-lg-1 text-center text-md-start'
            >
              <h5 className='text-dark mb-2'>Ngamia Africa</h5>
              <div className="d-flex justify-content-center flex-md-column flex-wrap">
                <p className='mb-2 mx-2 mx-md-0'>
                  <Link to="/dashboard" className="text-white">
                    Home
                  </Link>
                </p>
                <p className='mb-2 mx-2 mx-md-0'>
                  <Link to="/contact" className="text-white">
                    Contact Us
                  </Link>
                </p>
                <p className='mb-2 mx-2 mx-md-0'>
                  <Link to="/faqs" className="text-white">
                    FAQs
                  </Link>
                </p>
                <p className='mb-2 mx-2 mx-md-0'>
                  <a
                    href="https://www.ngamia.africa/marquee/"
                    target="_blank"
                    className="text-white"
                  >
                    Blog
                  </a>
                </p>
              </div>
            </Col>

            <Col
              xl
              lg={{ span: 3, order: 4 }}
              md={{ span: 4, order: 4 }}
              xs={{ order: 4 }}
              className='ps-lg-2 pe-lg-1 text-center text-md-start'
            >
              <h5 className='text-dark mb-2'>Useful Links</h5>
              <div className="d-flex justify-content-center flex-md-column flex-wrap">
                <p className='mb-2 mx-2 mx-md-0'>
                  <a href={ShareableUrl} className="text-white" target='_blank'>
                    Marquee
                  </a>
                </p>
                <p className='mb-2 mx-2 mx-md-0'>
                  <a href={PromoterUrl} className="text-white" target='_blank'>
                    Promoter
                  </a>
                </p>
                <p className='mb-2 mx-2 mx-md-0'>
                  <a href="https://www.ngamia.africa/" className="text-white" target='_blank'>
                    Ngamia Haulers Platform
                  </a>
                </p>
              </div>
            </Col>

            <Col
              xl={{ span: 3 }}
              lg={{ span: 6, order: 5 }}
              md={{ span: 5, order: 5 }}
              xs={{ order: 3 }}
              className='ps-lg-2 pe-lg-1 d-flex flex-column align-items-center align-items-md-start'
            >
              <h5 className='text-dark mb-2'>Contact Info</h5>
              <p className='mb-2 mx-2 mx-md-0 text-white text-center text-md-start'>
                Methodist Ministries Center, 3rd Flr Block B, Oloitoktok Rd – Kilimani, Nairobi
              </p>
              <p
                className='mb-2 mx-2 mx-md-0 text-white'
                onClick={e => {
                  window.location = `tel:+254 711 082 608`;
                  e.preventDefault();
                }}
                style={{ cursor: 'pointer' }}
              >
                +254 711 082608
              </p>
              <p
                className='mb-2 mx-2 mx-md-0 text-white'
                onClick={e => {
                  window.location = `mailto:business@marquee.africa`;
                  e.preventDefault();
                }}
                style={{ cursor: 'pointer' }}
              >
                business@marquee.africa
              </p>
            </Col>

            <Col
              xl={{ span: 'auto', order: 'last' }}
              lg={{ span: 4, order: 2 }}
              md={{ span: 5, order: 2 }}
              xs={{ order: 2 }}
              className="d-flex flex-xl-column align-items-center justify-content-center justify-content-lg-start justify-content-xl-center"
            >
              {/* google play badge */}
              <a href="https://play.google.com/store/apps/details?id=africa.ngamia.advertiser" className='my-2 mx-2' target='_blank'>
                <span className="d-md-none">
                  <img
                    src={DefaultValues?.google_play_badge}
                    alt='Get it on Google Play'
                    height="25px"
                  />
                </span>
                <span className="d-none d-md-block">
                  <img
                    src={DefaultValues?.google_play_badge}
                    alt=""
                    height="41px"
                  />
                </span>
              </a>
              {/* app store badge */}
              <a href="#" className='my-2 mx-2' target='_blank'>
                <span className="d-md-none">
                  <img
                    src={DefaultValues?.app_store_badge}
                    alt="Download on the App Store"
                    height="25px"
                  />
                </span>
                <span className="d-none d-md-block">
                  <img
                    src={DefaultValues?.app_store_badge}
                    alt=""
                    height="40px"
                  />
                </span>
              </a>
            </Col>
          </Row>

          <Row className="justify-content-center align-items-center mb-2">
            <Col
              lg={{ span: 4, order: 1 }}
              md={{ span: 6, order: 2 }}
              xs={{ span: 12, order: 3 }}
              className="d-flex align-items-center justify-content-center justify-content-md-start"
            >
              © {new Date().getFullYear()} Ngamia Haulers Platform Ltd.
            </Col>

            <Col
              lg={{ span: 4, order: 2 }}
              md={{ span: 6, order: 3 }}
              xs='12'
            >
              <p className='d-flex align-items-baseline justify-content-lg-center justify-content-md-end justify-content-center mt-0 mb-lg-0 mb-2'>
                <a
                  href="https://www.ngamia.africa/terms-of-service/"
                  className="nav-link px-2 text-white"
                  target="_blank"
                >
                  Terms & Conditions
                </a>
                |
                <a
                  href="https://www.ngamia.africa/privacy-policy/"
                  className="nav-link px-2 text-white"
                  target="_blank"
                >
                  Privacy Policy
                </a>
              </p>
            </Col>

            <Col
              lg={{ span: '4', order: 3 }}
              md={{ order: 1 }}
              xs='12'
              className="d-flex justify-content-center justify-content-lg-end justify-content-md-center"
            >
              {/* Social Media Icons */}
              <ul className="list-unstyled d-flex mb-2">
                <li className="ms-2">
                  <a href="https://www.facebook.com/MarqueeAfrica/" target="_blank">
                    <i className='bx bxl-facebook fs-4 p-1 rounded-circle bg-white' />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://twitter.com/MarqueeAfrica" target="_blank">
                    <i className='bx bxl-twitter fs-4 p-1 rounded-circle bg-white' />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://www.linkedin.com/showcase/MarqueeAfrica" target="_blank">
                    <i className='bx bxl-linkedin fs-4 p-1 rounded-circle bg-white' />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://www.instagram.com/MarqueeAfrica/" target="_blank">
                    <i className='bx bxl-instagram fs-4 p-1 rounded-circle bg-white' />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://www.youtube.com/channel/UCa2OYHjnHYukPlnT9Hx4SXQ" target="_blank">
                    <i className='bx bxl-youtube fs-4 p-1 rounded-circle bg-white' />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://wa.me/254791650607" target="_blank">
                    <i className='bx bxl-whatsapp fs-4 p-1 rounded-circle bg-white' />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment >
  );
};

export default Footer;
