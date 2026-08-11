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

module.exports = {
    create,
}
