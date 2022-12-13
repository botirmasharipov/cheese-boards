const { User } = require('./models/User')
const { Board } = require('./models/Board')
const { Cheese } = require('./models/Cheese')

User.belongsTo(Board)
Board.hasMany(Cheese)

module.exports = {
    User,
    Board,
    Cheese
}

