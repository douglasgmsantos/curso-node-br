const ICrud = require("./interfaces/ICrud")
const Mongoose = require('mongoose')

const STATUS = {
    0 : 'Desconectado',
    1 : 'Conectado',
    2 : 'Conectando',
    3 : 'Discontando'
}

class MongoDB extends ICrud {
    constructor() {
        super()

        this._herois = null;
        this._drive = null;

    }

    async create(item) {
        return await this._herois.create(item)
    }

    async read(item, skip = 0, limit = 10) {    
        return await this._herois.find(item).skip(skip).limit(limit)
    }

    async update(id, item) {
        return await this._herois.updateOne({_id: id}, {$set: item})
    }

    async delete(id) {
        return await this._herois.deleteOne({_id: id}   )
    }

    async isConnected(){
        const state = STATUS[this._drive.readyState]
        if(state === 'Conectado') return state;
        if(state !== 'Conectando') return state;
        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._drive.readyState]

    }

    async connect() {
        Mongoose.connect(
            'mongodb://douglasgmsantos:123456@localhost:27017/heroes',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.log(`Ocorreu um erro na coneção ${error}`)
            }
        )

        this._drive = Mongoose.connection
        this._drive.once('open', () => console.log('database rodando!!'))
        this.defineModel()
    }

    async defineModel(){
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
        
        this._herois = Mongoose.model('heroes', heroiSchema)
    }
}

module.exports = MongoDB