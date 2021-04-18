const Joi = require("@hapi/joi");

const OPTIONS = {
  language: {
    key: "{{label}} ",
  },
};

// sign up validation
const SIGNUP = (signUpData) => {
  const signUpSchema = Joi.object().keys({
    user_id: Joi.number(),
    firstName: Joi.string().min(2).max(20).required().label("First name"),
    lastName: Joi.string().min(2).max(20).required().label("Last name"),
    username: Joi.string().min(2).max(20).required().label("Username"),
    gender: Joi.string().required().label("Gender"),
    address: Joi.string().required().label("Address"),
    userType: Joi.string().label("UserType"),
    mobileNumber: Joi.number().required().label("Mobile Number"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .max(15)
      .required()
      .label("Password"),
  });
  return Joi.validate(signUpData, signUpSchema, OPTIONS);
};

// sign in validaiton
const SIGNIN = (signInData) => {
  const signInSchema = Joi.object().keys({
    username: Joi.string().min(2).max(20).required().label("Username"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .max(15)
      .required()
      .label("Password"),
  });

  return Joi.validate(signInData, signInSchema, OPTIONS);
};
// update validation
const USER = (userData) => {
  const userSchema = Joi.object().keys({
    user_id: Joi.number(),
    firstName: Joi.string().min(2).max(20).label("First name"),
    lastName: Joi.string().min(2).max(20).label("Last name"),
    address: Joi.string().label("Address"),
    mobileNumber: Joi.number().label("Mobile Number"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })

      .label("Email"),
  });
  return Joi.validate(userData, userSchema, OPTIONS);
};
module.exports = {
  SIGNUP,
  SIGNIN,
  USER,
};
