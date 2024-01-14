import Products from "../models/Products.js";

export const addProducts = (req, res) => {
  const products = new Products({
    Cash_payment_voucher: req.body.Cash_payment_voucher,
    Salary_payment_voucher: req.body.Salary_payment_voucher,
    GTN_Number: req.body.GTN_Number,
  });

  try {
    products.save();
    res.status(200).send("Product add successfully in Database");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProducts = async (__, res) => {
  try {
    const data = await Products.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
