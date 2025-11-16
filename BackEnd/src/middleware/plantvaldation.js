const { z } = require("zod");
const Plants=require('../models/plants');
const plantSchema = z.object({
  name: z.string().min(2, "Plant name must be at least 2 characters"),
  price: z.number().min(1, "Price must be at least 1"),
  categories: z.array(z.string()).nonempty("At least one category is required"),
  inStock: z.boolean().optional().default(true),

});

const validatePlant = (req, res, next) => {
  try {
    req.body = plantSchema.parse(req.body); 
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors[0].message });
  }
};

module.exports = validatePlant;
