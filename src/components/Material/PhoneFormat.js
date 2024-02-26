import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';


const PhoneFormat = forwardRef(function PhoneFormat(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="[*000] 000 000 000"
      unmask
      lazy={true}
      autoComplete="tel"
      // definitions={{
      //   '#': /[1-9]/,
      // }
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
    />
  );
});

PhoneFormat.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PhoneFormat;