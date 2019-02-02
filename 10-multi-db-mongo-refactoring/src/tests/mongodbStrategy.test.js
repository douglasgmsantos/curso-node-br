const assert = require('assert')
const MongoDb = require('../db/mongodb/mongodb')
const Context = require('../db/strategies/base/contextStrategy')
const HeroiSchema = require('../db/mongodb/schemas/heroSchema')

const MOCK_HERO_REGISTER = {
    nome: 'Mulher Maravilha',
    poder: 'Laço da verdade'
}

const MOCK_HERO_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Teia'
}

const MOCK_HERO_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
}

let MOCK_HERO_ID = ''

let context = {}

describe('MongoDB Strategy', function (){
    before( async () =>{
        const connection = MongoDb.connect()

        context = new Context(new MongoDb(connection, HeroiSchema))

        await context.create(MOCK_HERO_DEFAULT)
        const result = await context.create(MOCK_HERO_ATUALIZAR)
        MOCK_HERO_ID = result._id
    })

    it('MongoDB Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, 'Conectado')
    
    })

    it('cadastrar heroi', async () => {
        const { nome, poder} = await context.create(MOCK_HERO_REGISTER)
        assert.deepEqual({nome, poder}, MOCK_HERO_REGISTER)
    })

    it('listar heroi', async () =>{
        const [ {nome, poder} ] = await context.read({nome: MOCK_HERO_DEFAULT.nome})
        const result = {nome, poder}

        assert.deepEqual(result, MOCK_HERO_DEFAULT)
    })

    it('Atualizar heroi', async () =>{
        const result = await context.update(MOCK_HERO_ID, {
            nome: 'Pernalonga'
        })

        assert.deepEqual(result.nModified, 1)
    })
    

    it('deletar heroi', async () =>{
        const result = await context.delete(MOCK_HERO_ID)

        assert.deepEqual(result.n, 1)
    })


})