const Joi = require("@hapi/joi");

const OPTIONS = {
  language: {
    key: "{{label}} ",
  },
};

// Category validation
const CATEGORY = (CATEGORYData) => {
  const CATEGORYSchema = Joi.object().keys({
    categoryName: Joi.string().required().label("Category name"),
    categoryImage: Joi.string().label("Category Image"),
  });
  return Joi.validate(CATEGORYData, CATEGORYSchema, OPTIONS);
};

module.exports = {
  CATEGORY,
};
