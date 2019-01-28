const {deepEqual, ok} = require("assert")
const database  = require("./database")

describe("Suite de manipulação de Hérois" , ()=>{
    DEFAULT_HERO_REGISTER = {
        name: "The Flash",
        power: "Speed",
        id: 1
    }

    DEFAULT_HERO_UPDATER = {
        name: "Batman",
        power: "Speed",
        id: 2
    }

    before(async () =>{
        await database.register(DEFAULT_HERO_REGISTER)
        await database.register(DEFAULT_HERO_UPDATER)
    })

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

    it("deve remover o heroi por id", async() =>{
        const expected = true;
        const result = await database.removeById(DEFAULT_HERO_REGISTER.id)
        deepEqual(result, expected)
    })

    it("deve atualizar o heroi por id", async() =>{
        const expected = {
            ...DEFAULT_HERO_UPDATER,
            name : "Lanterna Verde",
            power: "Energia do anel"
        };

        const newData = {
            name : "Lanterna Verde",
            power: "Energia do anel"
        }

        await database.updateById(DEFAULT_HERO_UPDATER.id, newData)
        const [result]  = await database.list(DEFAULT_HERO_UPDATER.id)

        deepEqual(result, expected)
    })
})