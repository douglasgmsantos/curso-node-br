const {deepEqual, ok} = require("assert")
const database  = require("./database")

describe("Suite de manipulação de Hérois" , ()=>{
    DEFAULT_HERO_REGISTER = {
        name: "The Flash",
        power: "Speed",
        id: 1
    }

    it("Deve pesquisar um heroi cadastrado", async ()=> {
        const expected = DEFAULT_HERO_REGISTER
        const [response] = await database.list(expected.id)

        deepEqual(response, expected)
    })

    it("deve cadastrar um heroi, usando arquivo.", async ()=>{
        const expected =  DEFAULT_HERO_REGISTER;
        const result =  await database.register(DEFAULT_HERO_REGISTER)
        const [actual] =  await database.list(DEFAULT_HERO_REGISTER.id)

        deepEqual(actual, expected);
    })
})