const { sequelize } = require('../db')
const { Sequelize } = require('sequelize')

let Cheese = sequelize.define("cheese", {
    // Column names
    title: Sequelize.STRING,
    description: Sequelize.STRING,
})

module.exports = { Cheese }