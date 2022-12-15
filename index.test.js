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

    // Delete
    test('can delete user', async () => {
        await User.create({ name: 'don', email: 'don@gmail.com' })
        const foundUser = await User.findAll()
        const destroyUser = await foundUser[1].destroy()
        expect(destroyUser.name).toEqual('don')
    })

    test('can delete board', async () => {
        await Board.create({ type: 'old cheese', description: 'old-aged cheese', rating: '2', })
        const foundBoard = await Board.findAll()
        const destroyBoard = await foundBoard[1].destroy()
        expect(destroyBoard.type).toEqual('old cheese')
    })

    test('can delete cheese', async () => {
        await Cheese.create({ title: 'Burrata', description: 'Burrata is a fresh cheese featuring a thin layer of cheese with a mixture of stringy curd and fresh cream on the inside. It has a rich flavor and goes well with salads, crusty bread and Italian dishes.' })
        const foundCheese = await Cheese.findAll()
        const destroyCheese = await foundCheese[1].destroy()
        expect(destroyCheese.title).toEqual('Burrata')
    })

    //  One-to-Many - Multiple Boards can be added to a User.
    test('User and Board models can have One-to-Many relationship', async () => {
        const bobsBoard = await Board.create({ type: 'old cheese', description: 'old-aged cheese', rating: '2', })
        const johnsBoard = await Board.create({ type: 'chunks of parmesan', description: 'firm cheese', rating: '5', })

        let foundUser = await User.findAll()

        await foundUser[0].addBoard(bobsBoard)
        await foundUser[0].addBoard(johnsBoard)

        let getBoards = await foundUser[0].getBoards()
        expect(getBoards.length).toBe(2)
    })

    //  Many-to-many
    test('Board and Cheese models can have a Many-to-Many relationship', async () => {
        await Board.create({ type: 'old cheese', description: 'old-aged cheese', rating: '2', })
        let americanCheese = await Cheese.create({ title: 'american', description: 'American is a creamy, smooth cheese made from blending natural cheeses. It comes in several forms including individually wrapped cheese slices, small pre-sliced blocks and large blocks. It melts well.' })
        let asiagoCheese = await Cheese.create({ title: 'Asiago', description: 'Asiago, a nutty-flavored cheese, comes in two forms: fresh and mature. The fresh has an off-white color and is smoother and milder, while mature Asiago is yellowish and somewhat crumbly. Depending on its age, Asiago can be grated, melted or sliced.' })
        let findBoard = await Board.findAll()
        await findBoard[0].addCheese(americanCheese)
        await findBoard[0].addCheese(asiagoCheese)

        let findBobsBoard = await findBoard[0].getCheeses()
        expect(findBobsBoard.length).toBe(2)
    })

    // Eager Loading
    test('Eager Loading', async () => {
        await Board.findAll()
        let cheese = await Cheese.findAll()

        let frenchBoard = await Board.create({
            type: 'French Cheese Board',
            description: 'French Cheese Board is an ambassador of the French cheese experience and also serves as a platform for conversations and debates.',
            rating: 10
        })

        await frenchBoard.addCheese(cheese[0])
        await frenchBoard.addCheese(cheese[1])
        await frenchBoard.addCheese(cheese[2])

        let nicksBoard = await Board.findAll({
            include: [
                { model: Cheese, as: 'cheeses' }
            ]
        })

        expect(nicksBoard[4].type).toBe('French Cheese Board')
    })


})
