const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags including its associated product data
router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagData);
});

// GET one tag by id, including its associated product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => res.json(newTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT a tag by its id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No category with that ID' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by its id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedTag) => {
    if (!deletedTag) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.json(deletedTag);
  });
});

module.exports = router;
