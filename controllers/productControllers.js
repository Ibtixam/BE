import Products from "../models/Products.js";

export const addProducts = (req, res) => {
  const products = new Products({
    name: req.body.name,
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
