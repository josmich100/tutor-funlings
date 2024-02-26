import PropTypes from "prop-types";
import React, { useState } from "react";

import { Form, Spinner } from "react-bootstrap";

import { Link, withRouter } from "react-router-dom";

// material UI
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// material styles
import { inputStyles } from "assets/material/inputsStyles";

// Toast Alert
import toast from "react-hot-toast";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import AuthContainer from "components/AuthContainer";
import axios from "axios";

const Login = (props) => {
  const classes = inputStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // Globals
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handle Submit
  const handleValidSubmit = (event, values) => {
    event.preventDefault();

    // Processing
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    // Payload defination
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // API CALL: Login
    api
      .post("user/student/signin", payload, {
        method: "POST",
        // headers: {
        //   "content-type": "application/json",
        // },
      })
      .then((response) => {
        // Saving User Profile Data

        console.log(response);
        const token = response.data.token;
        const profile = response.data.profile;
        // get session expiry time
        const endTime = Date.now() + 900000;
        // save expiry time to profile
        profile["endTime"] = endTime;

        // save token to profile
        profile["token"] = token;
        // set store to null
        // profile["store"] = null;
        // profile["storeFiles"] = null;
        // save profile
        localStorage.setItem("authFunStudnt", JSON.stringify(profile));

        // getStoreDetails(profile);

        // navigate to dashboard
        props.history.push("/dashboard");
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

  const getStoreDetails = (profile) => {
    api
      .get(
        `${"api/MQCustomerStoresManagement/GetStoreProfiles"}?AdOwner=${
          profile.userId
        }`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${profile.token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.storeProfiles;

        if (data[0]) {
          profile["store"] = data[0];

          localStorage.setItem("authFunStudnt", JSON.stringify(profile));

          getStoreFiles(profile);
        } else {
          props.history.push("/dashboard");
        }
      })
      .catch((error) => {
        // setIsLoading(false)
        console.log(error.response?.data?.message);
        props.history.push("/dashboard");
      });
  };

  const getStoreFiles = (profile) => {
    api
      .get(
        `${"api/MQCustomerStoresManagement/GetStoreFiles"}?StoreId=${
          profile.store.id
        }`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${profile.token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        if (data[0]) {
          profile["storeFiles"] = data;

          localStorage.setItem("authFunStudnt", JSON.stringify(profile));
        }

        // navigate to dashboard
        props.history.push("/dashboard");
      })
      .catch((error) => {
        // setIsLoading(false)
        console.log(error.response?.data?.message);
        props.history.push("/dashboard");
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
          autoComplete="current-password"
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
        />

        <Form.Group className="mb-3" as="div">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="customControlInline"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label className="form-check-label" htmlFor="customControlInline">
              Remember me
            </label>
          </div>
        </Form.Group>

        <div className="mt-3 d-grid">
          <button
            className="btn btn-primary btn-block fw-bold"
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
              "LOGIN"
            )}
          </button>
        </div>
      </Box>

      <div className="mt-4">
        <Link
          to="/forgot-password"
          className="font-size-14 fw-bold text-primary text-decoration-underline"
        >
          Reset Password
        </Link>
      </div>

      <div className="mt-4">
        <p className="font-size-14">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="fw-bold text-decoration-underline text-primary"
          >
            {" "}
            Create Account{" "}
          </Link>
        </p>
      </div>
    </>
  );

  return (
    <AuthContainer
      meta="Login | Funlings Entertainment"
      form={mainForm}
      title="Welcome"
      subTitle="Login to continue to Funlings Entertainment."
      history={props.history}
      // isCentralForm={true}
    />
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
