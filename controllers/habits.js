const Habit = require('../models/habit')

const create = async (req, res) => {
    try {
        req.body.user = req.user._id
        const habit = await Habit.create(req.body)
        habit._doc.user = req.user
        res.status(201).json(habit)
    } catch (err) {
        res.status(500).json({err: err.message })
    }
}

const index = async (req, res) => {
  try {
const habits = await Habit.find({ user: req.user._id })
  .populate('category')
  .sort({ createdAt: 'desc' })
res.status(200).json(habits)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
    create,
    index,

}
