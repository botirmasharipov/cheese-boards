const { sequelize } = require('./db')
const { User, Board, Cheese } = require('./index')

describe('User, Cheese and Board Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true })
    })

    // CRUD tests
    // Create
    test('can create a User', async () => {
        const testUser = await User.create({ name: 'Botirjon', email: 'test@gmail.com' })
        expect(testUser.name).toBe('Botirjon')
    })

    test('can create a Board', async () => {
        const testBoard = await Board.create({ type: 'cheese board', description: 'this is cheese board', rating: '5', })
        expect(testBoard.type).toBe('cheese board')
    })

    test('can create a Cheese', async () => {
        const testCheese = await Cheese.create({
            title: 'Blue Cheese', description: 'Blue is a general name for cheeses that were made with Penicillium cultures, which creates “blue” spots or veins. Blue cheese has a distinct smell and, what some consider, an acquired taste. Blue cheeses can be eaten crumbed or melted. Check our our Blue Cheese Deviled Eggs for a fun blue cheese recipe.'
        })
        expect(testCheese.title).toBe('Blue Cheese')
    })

    // Read
    test('can fetch users', async () => {
        const findUser = await User.findAll()
        expect(findUser[0].name).toBe('Botirjon')
    })

    test('can fetch board', async () => {
        const findBoard = await Board.findAll()
        expect(findBoard[0].type).toBe('cheese board')
    })

    test('can fetch cheese', async () => {
        const findCheese = await Cheese.findAll()
        expect(findCheese[0].title).toBe('Blue Cheese')
    })

    // Read
    test('can fetch users', async () => {
        const findUser = await User.findAll()
        expect(findUser[0].name).toBe('Botirjon')
    })

    test('can fetch board', async () => {
        const findBoard = await Board.findAll()
        expect(findBoard[0].type).toBe('cheese board')
    })

    test('can fetch cheese', async () => {
        const findCheese = await Cheese.findAll()
        expect(findCheese[0].title).toBe('Blue Cheese')
    })

})
