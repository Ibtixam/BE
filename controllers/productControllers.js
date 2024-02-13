import Voucher from "../models/Voucher.js";

export const addVoucher = async (req, res) => {
  const { Voucher_Type, Voucher_Number, Amount, Location, Date } = req.body;
  const Voucher_Image = req.file?.filename;

  if (!Voucher_Image) {
    return res.status(400).send("Image is Required");
  }

  const newVoucher = new Voucher({
    user: req?.user?.id,
    Voucher_Type,
    Voucher_Number,
    Amount,
    Location,
    Date,
    Voucher_Image,
  });

  try {
    await newVoucher.save();
    res
      .status(200)
      .json({ data: "Voucher Successfuly Added", id: newVoucher?._id });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const getVoucher = async (req, res) => {
  try {
    const data = await Voucher.find({ user: req?.user?.id });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllVouchers = async (req, res) => {
  try {
    const data = await Voucher.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Voucher.deleteOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
