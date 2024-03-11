const router = require("express").Router();
const { SELECT } = require("sequelize/types/lib/query-types");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

// find all categories
// be sure to include its associated Products

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk({
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => res.json(newCategory))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedCategory) => {
    if (!updatedCategory[0]) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.json(updatedCategory);
  });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        res.status(404).json({ message: "No category with this id!" });
        return;
      }
      res.json(deletedCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
