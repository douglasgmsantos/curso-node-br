const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: "Hulk",
    poder: 'Força'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: "Batman",
    poder: 'Dinheiro'
}

describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    before(async () =>{
        await context.connect()
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgreSQL Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('cadastrar heroi', async ()=>{
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('listar heroi', async ()=>{
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar heroi',async ()=>{
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }

        await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})

        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    })

    it('Remover heroi pelo id', async ()=>{
        const [item] = await context.read({})
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1)
    })


})