const assert = require('assert')
const api = require('../api')
app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INCIAL = {
    nome: 'Capitão America',
    poder: 'Super força'
}

let MOCK_ID = ''
describe('Suite de testes da API HEROES', function(){
    this.beforeAll(async () =>{
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI_INCIAL
        })

        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
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

    it('Cadastrar POST - Herois', async () =>{
        const response = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        const statusCode = response.statusCode;
        const {
            message,
            _id
        } = JSON.parse(response.payload)

        
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso.")
    })

    it('Atualizar - Herois', async () =>{
        const _id  = MOCK_ID
        const expected = {
            poder : 'Resistencia'
        }

        const response = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = response.statusCode;
        const dados = JSON.parse(response.payload)

        
        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "Heroi atualizado com sucesso.")
    })


})