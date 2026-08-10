const Category = require('../models/category')

const create = async (req, res) => {
    try {
const category = await Category.create({ ...req.body, user: req.user._id })
res.status(201).json(category)
    } catch(err) {
        res.status(400).json({ err: err.message })
    }
}


module.exports = {
    create,
}