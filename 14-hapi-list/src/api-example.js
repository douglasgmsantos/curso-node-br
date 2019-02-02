// npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/mongodb/mongodb')
const HeroiSchema = require('./db/mongodb/schemas/heroSchema')

const app = new Hapi.Server({
    port:5000
})

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection,HeroiSchema))

    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (request, response) =>{
            return context.read()
        }
    }])


    await app.start()
    console.log("serivdor rodando na porta 5000")
}

main()