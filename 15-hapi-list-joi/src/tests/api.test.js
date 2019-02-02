const assert = require('assert')
const api = require('../api')

app = {}
describe('Suite de testes da API HEROES', function(){
    this.beforeAll(async () =>{
        app = await api
    })

    it('Listar /herois', async ()=>{
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=10`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Deve retornar somente 10 registros', async()=>{
        const TAMANHO_LIMIT = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMIT)
    })

    it('Deve retornar somente 1 item', async()=>{
        const TAMANHO_LIMIT = 3
        const NOME = "Homem Aranha-1549136488699"

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NOME}`
        })

        const [dados] = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados.nome, NOME)
    })

    it('Deve lançar excessão com o tipo de limit string', async()=>{
        const TAMANHO_LIMIT = "AEEEE"
        const NOME = "Homem Aranha-1549136488699"

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NOME}`
        })

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 400)
    })


    
})