const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products including its associated category and tag data
router.get('/', async (req, res) => {
  const productData = await Product.findAll({
    include: [{ model: Category }, { model: Tag }],
  }).catch((err) => {
    res.json(err);
  });
  res.json(productData);
});

// GET one product by id, including its associated category and tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    const tagIds = req.body.tagIds;
    if (req.body.tagIds) {
      await product.setTags(req.body.tagIds);
      await product.save();
      return res.status(200).json(await product.getTags());
    }
    if (tagIds && tagIds.length) {
      const productTagIdPairs = tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      // Create the product-tag associations
      await ProductTag.bulkCreate(productTagIdPairs);
    }
    res.status(200).json(product);
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// PUT a product by its id
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Tag],
    });
    product.update(req.body);
    if (req.body.tagIds) {
      await Product.setTags(req.body.tagIds);
    }
    await product.save();
    await product.reload();
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE a product by its id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
