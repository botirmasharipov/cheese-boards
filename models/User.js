const { Sequelize, sequelize } = require('../db')

let User = sequelize.define("user", {
    // Column names
    name: Sequelize.STRING,
    email: Sequelize.STRING,
})

module.exports = { User }