import Products from "../models/Products.js";

export const addProducts = (req, res) => {
  const { Cash_payment_voucher, Salary_payment_voucher, GTN_Number } = req.body;
  const products = new Products({
    user: req?.user?.id,
    Cash_payment_voucher,
    Salary_payment_voucher,
    GTN_Number,
  });

  try {
    products.save();
    res.status(200).send("Product add successfully in Database");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const data = await Products.find({ user: req?.user?.id });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
