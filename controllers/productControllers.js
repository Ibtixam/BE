import Products from "../models/Products.js";

export const addProducts = async (req, res) => {
  const { Voucher_Type, Voucher_Number, Amount, Date, Voucher_Image } =
    req.body;
  const products = new Products({
    user: req?.user?.id,
    Voucher_Type,
    Voucher_Number,
    Amount,
    Date,
    Voucher_Image,
  });

  try {
    await products.save();
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
