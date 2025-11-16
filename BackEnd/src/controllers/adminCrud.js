const Plants = require("../models/plants");
const User = require("../models/user");

const getAllPlants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skipIndex = (page - 1) * limit;

    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.categories = { $in: [category] };
    }

    const totalPlants = await Plants.countDocuments(query);
    const plants = await Plants.find(query)
      .skip(skipIndex)
      .limit(limit)
      .select("name price categories inStock imageUrl");

    res.status(200).json({
      plants,
      currentPage: page,
      totalPages: Math.ceil(totalPlants / limit),
    });
  } catch (err) {
    res.send(`Error occured while fetching plants ` + err);
  }
};
const plantsCreate = async (req, res) => {
  const { name, price, categories, inStock, imageUrl } = req.body;

  try {
    const user = await User.findOne({ emailId: req.user.emailId });
    const plantsadd = await Plants.create({
      ...req.body,
      adminId: user._id,
    });
    res.status(201).send("new plant addded");
  } catch (err) {
    res.send("an error while adding the plants " + err);
  }
};

const plantsDeletebyid = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlant = await Plants.findByIdAndDelete(id);

    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res
      .status(200)
      .json({ message: "Plant deleted successfully", plant: deletedPlant });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting plant", error: err.message });
  }
};

const plantsDeletebyname = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "Plant name is required" });
    }

    const deletedPlant = await Plants.findOneAndDelete({ name });

    if (!deletedPlant) {
      return res.status(404).json({ error: "Plant not found with given name" });
    }

    res.json({ message: "Plant deleted successfully", deletedPlant });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting plant by name", details: err.message });
  }
};

module.exports = {
  getAllPlants,
  plantsCreate,
  plantsDeletebyid,
  plantsDeletebyname,
};
