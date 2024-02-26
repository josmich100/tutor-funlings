import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { Col, Row, Spinner } from "react-bootstrap";

// material UI
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// material styles
import { inputStyles } from "assets/material/inputsStyles";
import PhoneFormat from "components/Material/PhoneFormat";

// Alerts
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import customerBaseUrl from "helpers/API/ShareableUrl";
import AuthContainer from "components/AuthContainer";

const Register = (props) => {
  const classes = inputStyles();

  // Globals
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowPassword2 = () => setShowPassword2(!showPassword2);

  const handlePhoneOnChange = (event) => {
    const phone = event.target.value;
    setPhoneNo(phone);
    if (
      phone.match(
        "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$"
      )
    ) {
      if (phone.substring(0, 4) === "+254" && phone.length === 13) {
        setPhoneError(false);
      } else if (phone.substring(0, 2) === "07" && phone.length === 10) {
        setPhoneError(false);
      }
    }
  };

  const handlePhoneOnFocusOut = (event) => {
    if (
      phoneNo.match(
        "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$"
      )
    ) {
      if (phoneNo.substring(0, 4) === "+254" && phoneNo.length === 13) {
        setPhoneError(false);
      } else if (phoneNo.substring(0, 2) === "07" && phoneNo.length === 10) {
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    } else {
      setPhoneError(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isValid = (data) => {
    if (data.get("password") === data.get("password2")) {
      if (!phoneError) {
        setPhoneError(false);
        setPassError(false);
        return true;
      } else {
        setPhoneError(true);
        toast.error("Invalid Phone Number");
      }
    } else {
      setIsLoading(false);
      setPassError(true);
      toast.error("Passwords don't match. Please try again.");
    }

    return false;
  };

  // handle Submit
  const handleValidSubmit = (event, values) => {
    event.preventDefault();

    // Processing
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    // Validation
    if (isValid(data)) {
      // Payload defination
      const payload = {
        email: data.get("email"),
        phone: phoneNo,
        firstName: data.get("fname"),
        middleName: null,
        lastName: data.get("lname"),
        gender: null,
        password: data.get("password"),
        activationURL: customerBaseUrl + "/activation?",
      };

      // API CALL: Register
      api
        .post("api/MQUserAuthentications/Register", payload, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;
          // setIsLoading(false);

          Swal.fire({
            title: "Success",
            icon: "success",
            text: data.message,
          }).then(() => {
            props.history.push("/login");
          });
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(error.response?.data?.message);
          }
        });
    } else {
      setIsLoading(false);
    }
  };

  const mainForm = (
    <>
      <Box component="form" onSubmit={(e, v) => handleValidSubmit(e, v)}>
        <Row>
          <Col xs={12} sm={6}>
            <TextField
              label="First Name"
              name="fname"
              id="fname"
              className={classes.defaultInput}
              required
              fullWidth
              variant="standard"
              type="text"
              placeholder="e.g. Jane"
              autoComplete="given-name"
              size="small"
              margin="normal"
              InputProps={{ disableUnderline: true }}
            />
          </Col>
          <Col>
            <TextField
              label="Last Name"
              name="lname"
              id="lname"
              className={classes.defaultInput}
              required
              fullWidth
              variant="standard"
              type="text"
              placeholder="e.g. Smith"
              autoComplete="family-name"
              size="small"
              margin="normal"
              InputProps={{ disableUnderline: true }}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <TextField
              label="Email Address"
              name="email"
              id="email"
              className={classes.defaultInput}
              required
              fullWidth
              variant="standard"
              type="email"
              placeholder="e.g. janesmith@email.com"
              autoComplete="email"
              size="small"
              margin="normal"
              InputProps={{ disableUnderline: true }}
              error={emailError}
              helperText={emailError ? "Wrong Email" : ""}
            />
          </Col>
          <Col>
            <TextField
              label="Phone Number"
              name="phone"
              id="phone"
              value={phoneNo}
              onChange={handlePhoneOnChange}
              onBlur={handlePhoneOnFocusOut}
              className={classes.defaultInput}
              required
              fullWidth
              variant="standard"
              type="tel"
              placeholder="+254 7XX XXX XXX"
              size="small"
              margin="normal"
              InputProps={{
                inputComponent: PhoneFormat,
                disableUnderline: true,
              }}
              error={phoneError}
              helperText={phoneError ? "Wrong phone number" : ""}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <TextField
              label="Password"
              name="password"
              id="password"
              className={classes.defaultInput}
              required
              fullWidth
              variant="standard"
              type={showPassword ? "text" : "password"}
              placeholder="******"
              size="small"
              autoComplete="new-password"
              margin="normal"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="text-primary"
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={passError}
            />
          </Col>
          <Col>
            <TextField
              label="Confirm Password"
              name="password2"
              id="password2"
              className={classes.defaultInput}
              required
              fullWidth
              variant="standard"
              type={showPassword2 ? "text" : "password"}
              placeholder="******"
              size="small"
              margin="normal"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="text-primary"
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={passError}
              helperText={passError ? "Passwords not matching" : ""}
            />
          </Col>
        </Row>

        <div>
          <p className="mb-0 mt-3">
            By registering, you agree to Ngamia Haulers Platform Limited{" "}
            <a
              href="https://www.ngamia.africa/terms-of-service/"
              target="_blank"
              className="fw-bold text-decoration-underline text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://www.ngamia.africa/privacy-policy/"
              target="_blank"
              className="fw-bold text-decoration-underline text-primary"
            >
              Privacy Policy.
            </a>
          </p>
        </div>

        <div className="mt-3 d-grid">
          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Loading...
              </>
            ) : (
              "SUBMIT"
            )}
          </button>
        </div>
      </Box>

      <div className="mt-4">
        <p className="font-size-14">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-decoration-underline fw-bold text-primary"
          >
            {" "}
            Login{" "}
          </Link>{" "}
        </p>
      </div>
    </>
  );

  return (
    <AuthContainer
      meta="Register | Funlings Entertainment"
      form={mainForm}
      title="Create Account"
      subTitle="Get your free Funlings Entertainment account."
      history={props.history}
      // isCentralForm={true}
    />
  );
};

export default withRouter(Register);

Register.propTypes = {
  history: PropTypes.object,
};
