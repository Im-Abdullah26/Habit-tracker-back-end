const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')
const categoriesCtrl = require('./controllers/categories')
const habitsCtrl = require('./controllers/habits')

const verifyToken = require('./middleware/verify-token')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes go here
// app.get('/auth/sign-token', authCtrl.signToken)
// app.get('/auth/verify-token', authCtrl.verifyToken)
app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)

app.get('/users', verifyToken, usersCtrl.index)
app.post('/categories', verifyToken, categoriesCtrl.create)
app.get('/categories', verifyToken, categoriesCtrl.index)
app.put('/categories/:categoryId', verifyToken, categoriesCtrl.update)
app.delete('/categories/:categoryId', verifyToken, categoriesCtrl.deleteCategory)

app.post('/habits', verifyToken, habitsCtrl.create)
app.get('/habits', verifyToken, habitsCtrl.index)
app.put('/habits/:habitId', verifyToken, habitsCtrl.update)
app.delete('/habits/:habitId', verifyToken, habitsCtrl.deleteHabit)

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})
