const ICrud = require("./interfaces/ICrud")
const Sequelize = require('sequelize');

class Postegres extends ICrud{
    constructor(){
        super()
        this._drive = null;
        this._herois = null;
    }


    async create(item){
        const {dataValues} = await this._herois.create(item);
        return dataValues
    }

    async read(item = {}){
        const result = await this._herois.findAll({ where: item, raw:true})
        return result
    }

    async update(id, item = {}){
        return this._herois.update(item, {where: {id:id} })
    }

    async delete(id){
        const query = id ? { id } :{}
        return this._herois.destroy({where: query })
    }

    async isConnected(){
        try{
            await this._drive.authenticate()
            return true;
        }catch(error){
            console.log("CONNECT", `Erro ao tentar se conectar: ${error}`)
            return false
        }
    }

    async connect(){
        
        this._drive = new Sequelize(
            'heroes',
            'douglasgmsantos',
            '123456',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        this.defineModel()
    }

    async defineModel(){
        this._herois = this._drive.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome:{
                type: Sequelize.STRING,
                required: true
            },
            poder:{
                type: Sequelize.STRING,
                required: true
            }
    
        },{
          tableName: "TB_HEROIS",
          freezeTableName: false,
          timestamps: false   
        })
    
        await this._herois.sync()
    }
}

module.exports = Postegres