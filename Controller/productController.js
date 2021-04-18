const Product = require("../Model/productModel");
const Validation = require("../Validation/productValidation");
const ImageUpload = require("../middleware/imageUpload");


class ProductController {
  //Insert
  async addProduct(req, res) {
    console.log(req.body);
    const result = Validation.PRODUCT({
      ...req.body,
      productImage: req.file.filename,
    });

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new product in db
        let newProduct = new Product(result.value);
        let product = await newProduct.save();
        res.status(201).json({
          success: true,
          message: "Product added successfully!",
          product: product,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  //update
  async updateProduct(req, res) {
    const result = Validation.PRODUCT(req.body);
    console.log(req.body);

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new product in db
        const productId = req.params._id;
        let {
          productName,
          productPrice,
          productDescription,
          category,
        } = result.value;
        let updateProduct = await Product.findOneAndUpdate(
          { _id: req.params._id },
          { productName, productPrice, productDescription, category },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "Product updated successfully!",
          product: updateProduct,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  //deleteProduct
  async deleteProduct(req, res) {
    try {
      let id = req.params.id;
      let prod = await Product.findById({ _id: id });
      if (!prod) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "Product Not Found",
        });
      }
      let product = await Product.findByIdAndDelete({ _id: id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "Product deleted successfully!",
        product: product,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayAll Product
  async showProduct(req, res) {
    try {
      let product = await Product.find();
      res.status(201).json({
        status: 201,
        success: true,
        message: "Products displayed successfully!",
        products: product.reverse(),
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayProduct(Single)
  async showSingleProduct(req, res) {
    try {
      // let id=req.params
      let product = await Product.findById({ _id: req.params.id });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Single Product retrieved successfully!",
        product: product,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async uploadDisplayPicture(request, response) {
    try {
      ImageUpload(request, response, (error) => {
        if (error) {
          response.status(500).json({ error: error });
        } else {
          Product.findByIdAndUpdate(
            { _id: request.params.id },
            { $set: { productImage: request.file.filename } },
            { new: true },
            (err, updatedProduct) => {
              if (err) {
                // console.log(err.message);
                response
                  .status(500)
                  .json({ success: false, error: err.message });
              } else {
                response.status(200).json({
                  success: true,
                  message: "Picture uploaded successfully !",
                  image: request.file.filename,
                  updatedProduct: updatedProduct,
                });
              }
            }
          );
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = ProductController;
