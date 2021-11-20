/**
 * Common validation methods I was sing based on the validator library
 * 
 * Unforunately not implemented as much site wide as I would like
 */
import { isEmail, isPostalCode, isMobilePhone } from "validator";

export const isRequired = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export const validatePostalCode = (value) => {
  if (!isPostalCode(value, 'CA')) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid Canadian postal code.
      </div>
    );
  }
}

// const validateExtension = ()
// JPG, PNG, BMP, GIF, TIF, WEBP, HEIC, PDF

export const validateMobilePhone = (value) => {
  if (!isMobilePhone(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid Canadian mobile phone number.
      </div>
    );
  }
}


export const charLimit = (value) => {
  if (value && value.length > 1000) {
    return (
      <div className="alert alert-danger" role="alert">
        The limit is under 1000 Characters
      </div>
    )
  }
}


export const validateEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

export const validateUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};


export const validatePassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


export default {
  charLimit,
  validateMobilePhone,
  validatePostalCode,
  validatePassword,
  validateUsername,
  validateEmail,
  isRequired,

}