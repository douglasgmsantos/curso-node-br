//npm install mongoose
const Mongoose = require('mongoose')

Mongoose.connect(
    'mongodb://douglasgmsantos:123456@localhost:27017/heroes',
    {useNewUrlParser: true }, function(error){
        if(!error) return;
        console.log(`Ocorreu um erro na coneção ${error}`)
    }
)

const connection = Mongoose.connection

connection.once('open', () => console.log('database rodando!!'))
const state = connection.readyState

setTimeout( () =>{
    console.log(connection.readyState)
}, 1000)

// console.log('state', state)
/*
     0 : Desconectado
     1 : Conectado
     2 : Conectando
     3 : Discontando
*/

const heroiSchema = new Mongoose.Schema({
    nome: {
        type : String,
        required: true
    },
    poder: {
        type : String,
        required: true
    },
    insertdAt: {
        type : Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroes', heroiSchema)

async function main(){

    const result = await model.create({
        nome: 'Batman',
        poder : 'dinheiro'
    })

    console.log("result", result)


    const list = await model.find()
    console.log("list", list)
}

main()