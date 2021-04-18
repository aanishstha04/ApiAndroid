const Joi = require("@hapi/joi");

const OPTIONS = {
  language: {
    key: "{{label}} ",
  },
};

// Cart validation
const CART = (CartData) => {
  const CartSchema = Joi.object().keys({
    productId: Joi.string().required().label("ProductId"),
    userId: Joi.string().required().label("UserId"),
    quantity: Joi.number().required().label("Quantity"),
    total: Joi.string().required().label("SubTotal"),
  });
  return Joi.validate(CartData, CartSchema, OPTIONS);
};

module.exports = {
  CART,
};
