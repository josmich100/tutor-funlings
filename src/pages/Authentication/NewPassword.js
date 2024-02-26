import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { Spinner } from "react-bootstrap";
import { IMaskInput } from "react-imask";

// material UI
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// material styles
import { inputStyles } from "assets/material/inputsStyles";

// Alerts
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import AuthContainer from "components/AuthContainer";

const OTPFormat = forwardRef(function OTPFormat(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0 0 0 0 0"
      unmask
      inputRef={ref}
      lazy={true}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
    />
  );
});

const NewPassword = (props) => {
  // Getting Vendor Data
  const { state } = props.location;

  const classes = inputStyles();

  const [otp, setOtp] = useState("");
  const [passError, setPassError] = useState(false);
  const [OTPError, setOTPError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Globals
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowPassword2 = () => setShowPassword2(!showPassword2);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOTPChange = (event) => setOtp(event.target.value);

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    event.preventDefault();

    // Processing
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    // Validation
    if (data.get("password") === data.get("password2")) {
      // Payload defination
      const payload = {
        username: state,
        otp: otp,
        password: data.get("password"),
      };

      // API CALL: Login
      api
        .post("api/MQUserAuthentications/NewPassword", payload, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          // setIsLoading(false);

          Swal.fire({
            title: "Password Reset is Successful",
            icon: "success",
            text: "You will now proceed to Login Page",
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
      setPassError(true);
      toast.error("Passwords don't match. Please try again.");
    }
  };

  const mainForm = (
    <>
      <Box component="form" onSubmit={(e, v) => handleValidSubmit(e, v)}>
        <TextField
          label="OTP Code"
          name="otpcode"
          id="otpcode"
          value={otp}
          onChange={handleOTPChange}
          className={classes.defaultInput}
          required
          fullWidth
          variant="standard"
          placeholder="#####"
          size="small"
          margin="normal"
          autoComplete="one-time-code"
          InputProps={{
            inputComponent: OTPFormat,
            disableUnderline: true,
          }}
          error={OTPError}
          helperText="(Get code from your email)"
        />

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
        <p>
          Did't receive a code ?{" "}
          <Link
            to="/forgot-password"
            className="h6 text-decoration-underline text-primary"
          >
            {" "}
            New Request{" "}
          </Link>{" "}
        </p>
      </div>
    </>
  );

  return (
    <AuthContainer
      meta="New Password | Funlings Entertainment"
      form={mainForm}
      title="Set New Password"
      subTitle="Please enter your new Account Password."
      history={props.history}
      // isCentralForm={true}
    />
  );
};

export default withRouter(NewPassword);

NewPassword.propTypes = {
  history: PropTypes.object,
};
