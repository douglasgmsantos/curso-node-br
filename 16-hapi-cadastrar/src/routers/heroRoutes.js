const BaseRoute = require('./base/baseRouter')
const Joi = require('joi')
const failAction = function(request, headers, error){
    throw error
}

class HeroRoutes extends BaseRoute{ 
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path: '/herois',
            method: 'GET',
            config:{
                validate: {
                    failAction,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100),
                    }
                }
            },
            handler: (request, headers) =>{
                try{
                    const {
                        limit, skip, nome
                    } = request.query

                    let query =  nome ? {
                        nome : {
                            $regex: `.*${nome}*.`
                        }
                    } : { }

                    return this.db.read(nome ? query : {}, skip, limit)
                }catch(error){
                    console.log("Erro no meu servidor", error)
                    return error
                }
                
            }
        }
    }

    create(){
        return {
            path: '/herois',
            method: 'POST',
            config:{
                validate: {
                    failAction,
                    payload:{
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) =>{
                try{
                    const {nome, poder} = request.payload
                    const result = await this.db.create({nome, poder})
                    return {
                        message: 'Heroi cadastrado com sucesso.',
                        _id: result._id
                    }

                }catch(error){
                    console.log("DEU RUIM", error)
                    return 'Internal Error'    
                }
            }
        }
    }
}

module.exports = HeroRoutes
