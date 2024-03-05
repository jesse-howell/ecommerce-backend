const router = require("express").Router();
const { SELECT } = require("sequelize/types/lib/query-types");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  console.log(categories.every((category) => category instanceof Category));
  console.log("All categories:", JSON.stringify(categories, null, 2));

  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
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
