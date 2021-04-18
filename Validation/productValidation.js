const Joi = require("@hapi/joi");

const OPTIONS = {
  language: {
    key: "{{label}} ",
  },
};

// Product validation
const PRODUCT = (PRODUCTData) => {
  const PRODUCTSchema = Joi.object().keys({
    productName: Joi.string().required().label("Product name"),
    productPrice: Joi.number().required().label("Procut Price"),
    productDescription: Joi.string().required().label("Product Description"),
    category: Joi.string().required().label("Category"),
    productImage: Joi.string().label("Product Image"),
  });
  return Joi.validate(PRODUCTData, PRODUCTSchema, OPTIONS);
};

module.exports = {
  PRODUCT,
};
