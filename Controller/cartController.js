const Cart = require("../Model/cartModel");
const Validation = require("../Validation/cartValidation.js");

class CartController {
  //Insert
  async addCart(req, res) {
    // console.log(req.body);
    // const result = Validation.CART();

    // if (result.error) {
    //   let error = result.error.details[0];
    //   res.status(422).json({
    //     success: false,
    //     status: 422,
    //     message: error.message,
    //   });
    // } else {

    try {
      Cart.findOne({
        userId: req.authUser._id,
        productId: req.body.productId,
      }).then(async function (cart) {
        if (cart) {
          var cartQuantity = cart.quantity + 1;
          // var cartPrice = cart.price;
          // var cartsubTotal = cartQuantity * cart.price;
          // var cartsubTotal = cart.quantity + 1;
          Cart.findOneAndUpdate(
            { userId: req.authUser._id, productId: req.body.productId },
            { $set: { quantity: cartQuantity } }
          )
            .then(function (updateCart) {
              console.log("Here", updateCart);

              return res.json({
                success: true,
                message: "Cart Updated",
                cart: [],
              });
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error.message,
              });
            });
        } else {
          // save the new cart in db
          const carts = {};
          let newCart = new Cart({
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.authUser._id,
          });

          let cart = await newCart.save();

          res.status(201).json({
            success: true,
            message: "Cart added successfully!",
            cart: [],
          });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //AndroidCart
  async addAndroidCart(req, res) {
    console.log(req.body);
    const result = Validation.CART();

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new cart in db
        const carts = {};
        let newCart = new Cart({
          productId: req.body.productId,
          quantity: req.body.quantity,
          userId: req.authUser._id,
        });

        cart.findOne({
          productId: req.body.productId,
          userId: req.body.userId,
        });

        let cart = await newCart.save();

        res.status(201).json({
          success: true,
          message: "Cart added successfully!",
          cart: cart,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  //deleteController
  async deleteCart(req, res) {
    console.log(req.params.id);
    try {
      let id = req.params.id;
      let cart = await Cart.findById({ _id: id });
      if (!cart) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "Cart Not Found",
        });
      }
      let cartDelete = await Cart.findByIdAndDelete({ _id: id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "Cart deleted successfully!",
        cartDelete: cartDelete,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //update
  async updateCart(req, res) {
    // console.log(req.body);
    // console.log(req.params.id);
    const result = Validation.CART(req.body);
    console.log(req.body);

    // if (result.error) {
    //   let error = result.error.details[0];
    //   res.status(422).json({
    //     success: false,
    //     status: 422,
    //     message: error.message,
    //   });
    // } else {
    try {
      // save the new cart in db
      const cartId = req.params._id;

      let updateCart = await Cart.findOneAndUpdate(
        { _id: req.params.id },
        {
          quantity: req.body.quantity,
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Cart updated successfully!",
        cart: updateCart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    // }
  }

  //displayAll Cart
  async showCart(req, res) {
    console.log("................");
    try {
      let cart = await Cart.find({ userId: req.authUser._id }).populate(
        "productId"
      );
      res.status(201).json({
        status: 201,
        success: true,
        message: "Cart displayed successfully!",
        cart: cart,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayProduct(Single)
  async showSingleCart(req, res) {
    try {
      // let id=req.params
      let cart = await Cart.findById({ _id: req.params.id });

      let review = await Review.findOne({ cartId: req.params.id }).populate(
        "userId"
      );
      res.status(201).json({
        status: 201,
        success: true,
        message: "Single Cart retrieved successfully!",
        cart: cart,
        review: review,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
module.exports = CartController;
