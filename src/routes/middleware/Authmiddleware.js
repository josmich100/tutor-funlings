import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      //Activation Link Format : https://customerdev-marquee.ngamia.africa/activation?ActivationId=ec180fa9-b38d-4476-bd6f-67594eafd7b3

      // Email Verification : https://customerdev-marquee.ngamia.africa/verifyNewEmail?id=fc77e065-83c3-4f46-a247-78fb4061cf40&email=foduor@ngamia.africa&Code=Q2ZESjhPWmR3WUpIZHRWRWsvLzVxQXlvUGNxejdHUXZBUnk0OG16VkxEa2JCREx3azJNQ1AzODlpaFNMS1kzTTdpaGVyaGZnUkZRTFI0T2lRYVpXeTJwenBMWkQ0dE9qMzlTYy94MHZZMVJyb2c5UzBTVGk5RFZhYmp3Qnp3Z05ndUc2WThKT29TWklqbTJUdW5hUUJFZTB6MFRTYWliaEVtNXZxZk9DOU1uVXhEcHJUU3FqeHEyanQrVmlDeDZuUTRTM29NM1dVM0M1ZE9idWFiLyt5SHhQd3M0YXpZdzVPTG52bGdVVXZ3T3k4dFdzYlp6RFFuUEI2dHZMM2ZzL0N5ckhDQT09

      const query = new URLSearchParams(props.location.search);
      const activationId = query.get("ActivationId");
      const Email = query.get("email");
      const UserId = query.get("id");
      const Code = query.get("Code");

      if (activationId) {
        return (
          <Redirect to={{ pathname: "/activation", state: activationId }} />
        );
      }

      if (UserId) {
        return (
          <Redirect
            to={{
              pathname: "/verifyNewEmail",
              state: {
                userId: UserId,
                email: Email,
                code: Code,
              },
            }}
          />
        );
      }

      if (isAuthProtected && !localStorage.getItem("authFunStudnt")) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
