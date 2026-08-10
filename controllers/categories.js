const Category = require('../models/category')

const create = async (req, res) => {
    try {
const category = await Category.create({ ...req.body, user: req.user._id })
res.status(201).json(category)
    } catch(err) {
        res.status(400).json({ err: err.message })
    }
}

const index = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id })
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}


module.exports = {
    create,
    index,

}