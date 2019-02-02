const ICrud = require("../strategies/interfaces/ICrud")
const Sequelize = require('sequelize');

class Postegres extends ICrud{
    constructor(connection, schema){
        super()
        this._connection = connection;
        this._schema = schema;
    }


    async create(item){
        const {dataValues} = await this._schema.create(item);
        return dataValues
    }

    async read(item = {}){
        const result = await this._schema.findAll({ where: item, raw:true})
        return result
    }

    async update(id, item = {}){
        return this._schema.update(item, {where: {id:id} })
    }

    async delete(id){
        const query = id ? { id } :{}
        return this._schema.destroy({where: query })
    }

    async isConnected(){
        try{
            await this._connection.authenticate()
            return true;
        }catch(error){
            console.log("CONNECT", `Erro ao tentar se conectar: ${error}`)
            return false
        }
    }

    static async connect(){
        const connection = new Sequelize(
            'heroes',
            'douglasgmsantos',
            '123456',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            }
        )
        return connection
    }

    static async defineModel(connection, schema){
        const model = connection.define(
            schema.name, 
            schema.schema,
            schema.options 
        )
        await model.sync()
        return model
    }
}

module.exports = Postegres