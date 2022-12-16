const { User } = require('./models/User')
const { Board } = require('./models/Board')
const { Cheese } = require('./models/Cheese')

User.belongsTo(Board)
User.hasMany(Board)

Board.belongsToMany(Cheese, { through: 'cheese_boards' })
Cheese.belongsToMany(Board, { through: 'cheese_boards' })

module.exports = {
    User,
    Board,
    Cheese
}

