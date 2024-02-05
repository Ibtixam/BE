import Products from "../models/Products.js";

export const addProducts = async (req, res) => {
  const { Voucher_Type, Voucher_Number, Amount, Location, Date } = req.body;
  const Voucher_Image = req.file.filename;
  const products = new Products({
    user: req?.user?.id,
    Voucher_Type,
    Voucher_Number,
    Amount,
    Location,
    Date,
    Voucher_Image,
  });

  if (!Voucher_Image) {
    return res.status(400).send("Image is Required");
  }
  try {
    await products.save();
    res.status(200).send("Voucher Successfuly Added");
  } catch (error) {
    res.status(500).send("Internal Server Error");
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
