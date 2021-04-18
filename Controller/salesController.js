const Sales = require("../Model/salesModel");
const Validation = require("../Validation/salesValidation");

class SalesController {
  //Insert
  async addSales(req, res) {
    // const result = Validation.SALES(req.body);

    // if (result.error) {
    //   let error = result.error.details[0];
    //   res.status(422).json({
    //     success: false,
    //     status: 422,
    //     message: error.message,
    //   });
    // } else {
    try {
      // save the new Sales in db
      let newSales = new Sales(req.body);
      let sales = await newSales.save();
      res.status(201).json({
        success: true,
        message: "Sales added successfully!",
        sales: sales,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  // }

  //displayAll Product
  async showSales(req, res) {
    try {
      let sales = await Sales.find();
      res.status(201).json({
        status: 201,
        success: true,
        message: "History displayed successfully!",
        sales: sales,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayProduct(Single)
  async showSingleSales(req, res) {
    try {
      // let id=req.params
      let sales = await Sales.findById({ _id: req.params.id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "Single Sales history retrieved successfully!",
        sales: sales,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = SalesController;
