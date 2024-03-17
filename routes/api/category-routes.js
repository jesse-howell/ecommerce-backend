// const router = require("express").Router();
// const { Category, Product } = require("../../models");

// // The `/api/categories` endpoint

// router.get("/", async (req, res) => {
//   const categoryData = await Category.findAll({
//     include: [{ model: Product }],
//   }).catch((err) => {
//     res.json(err);
//   });
//   res.json(categoryData);
// });

// // find all categories
// // be sure to include its associated Products

// router.get("/:id", async (req, res) => {
//   try {
//     const categoryData = await Category.findByPk(req.params.id, {
//       include: [{ model: Product }],
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: "No category with this id!" });
//       return;
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });

// router.post("/", async (req, res) => {
//   // create a new category
//   Category.create({
//     category_name: req.body.category_name,
//   })
//     .then((newCategory) => res.json(newCategory))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // router.put("/:id", async (req, res) => {
// // update a category by its `id` value
// //   Category.update(req.body, {
// //     where: {
// //       id: req.params.id,
// //     },
// //   })
// //     .then((updatedCategory) => {
// //       if (!updatedCategory) {
// //         res.status(404).json({ message: "No category with this id!" });
// //         return;
// //       }
// //       res.json(updatedCategory);
// //     })
// //     .catch((err) => {
// //       res.status(500).json(err);
// //     });
// // });
// // router.put("/:id", async (req, res) => {
// //   const updated = await Category.update(req.body, {
// //     where: { id: req.params.id },
// //     returning: true,
// //   });

// //   if (!updated[0]) {
// //     console.log(!updated);

// //     return res.status(404).json({ message: "No category with this id!" });
// //   }
// //   console.log(updated);

// //   return res.json(updated[1][0]);
// // });
// router.put("/:id", async (req, res) => {
//   try {
//     const categoryData = await Category.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!categoryData[0]) {
//       res.status(404).json({ message: "No category with that ID" });
//       return;
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   // delete a category by its `id` value
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedCategory) => {
//       if (!deletedCategory) {
//         res.status(404).json({ message: "No category with this id!" });
//         return;
//       }
//       res.json(deletedCategory);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// module.exports = router;

// /Functionality for req endpoint /api/categories
const router = require('express').Router();
const { Category, Product } = require('../../models');
//Get all Categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get a Category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create new Category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a Category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with that ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete a Category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
