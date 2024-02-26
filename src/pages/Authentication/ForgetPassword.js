import PropTypes from "prop-types";
import React, { useState } from "react";

import { Spinner } from "react-bootstrap";

import { Link, withRouter } from "react-router-dom";

// material UI
import { Box, TextField } from "@mui/material";
// material styles
import { inputStyles } from "assets/material/inputsStyles";

// Toast Alert
import toast from "react-hot-toast";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import AuthContainer from "components/AuthContainer";

const Login = (props) => {
  const classes = inputStyles();

  // Globals
  const [isLoading, setIsLoading] = useState(false);

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Processing
    setIsLoading(true);

    // Payload defination
    const payload = {
      username: data.get("email"),
      appSigned: "QCBNUJ854",
    };

    // API CALL: Forgot Password
    api
      .post("api/MQUserAuthentications/ForgetPassword", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        toast.success(response?.data?.message);

        // Redirect to Reset Password
        props.history.push({
          pathname: "/new-password",
          state: data.get("email"),
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
  };

  const mainForm = (
    <>
      <Box component="form" onSubmit={(e, v) => handleValidSubmit(e, v)}>
        <TextField
          label="Email Address"
          name="email"
          id="email"
          className={classes.defaultInput}
          required
          fullWidth
          variant="standard"
          type="email"
          placeholder="e.g. johnsmith@email.com"
          autoComplete="email"
          size="small"
          margin="normal"
          InputProps={{ disableUnderline: true }}
        />

        <div className="mt-3 mx-5 d-grid">
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
              "RESET"
            )}
          </button>
        </div>
      </Box>

      <div className="mt-5">
        <p>
          Remember Password?{" "}
          <Link
            to="/login"
            className="h6 text-decoration-underline text-primary"
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
      meta="Forgot Password | Funlings Entertainment"
      form={mainForm}
      title="Reset Password"
      subTitle="Provide your email to recover your account."
      history={props.history}
      // isCentralForm={true}
    />
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
