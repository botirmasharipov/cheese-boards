const { sequelize } = require('../db')
const { Sequelize } = require('sequelize')

let Board = sequelize.define("board", {
    // Column names
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER,
})

module.exports = { Board }