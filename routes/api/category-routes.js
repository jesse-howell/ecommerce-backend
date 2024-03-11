const router = require("express").Router();
const { SELECT } = require("sequelize/types/lib/query-types");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categoryData = await Category.findAll({ include: [{
    model: Product,
  }] });
    res.json(categoryData)


  // console.log(categoryData.every((category) => category instanceof Category));
  // console.log("All categories:", JSON.stringify(categories, null, 2));
  // console.log(productData.every((product) => product instanceof Product));
  // console.log("All products:", JSON.stringify(products, null, 2));

  // find all categories
  // be sure to include its associated Products
  
});

router.get("/:id", async (req, res) => {
  const categoryId = await Category.findOne({ where: { id: }}); 
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
