const { Sequelize, sequelize } = require('../db')

let Cheese = sequelize.define("cheese", {
    // Column names
    title: Sequelize.STRING,
    description: Sequelize.STRING,
})

module.exports = { Cheese }