const Joi = require("@hapi/joi");

const OPTIONS = {
  language: {
    key: "{{label}} ",
  },
};

// Order validation
const SALES = (SALESData) => {
  const SALESSchema = Joi.object().keys({
    userId: Joi.string().required().label("User Id"),
    total: Joi.string().required().label("Grand Total"),
  });
  return Joi.validate(SALESData, SALESSchema, OPTIONS);
};

module.exports = {
  SALES,
};
