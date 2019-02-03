const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = function (request, h, err){
    throw err;
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config:{
                tags: ['api'],
                description: 'Deve listar herois',
                notes: 'Pode paginar resultados e filtrar por nome',
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
    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar heroi',
                notes: 'Deve cadastrar heroi pelo nome e poder',
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().max(100).required(),
                        poder: Joi.string().max(30).required()
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }
    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Deve atualizar heroi',
                notes: 'Deve atualizar heroi pelo id',
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().max(100),
                        poder: Joi.string().max(30)
                    },
                    params: {
                        id: Joi.string().required()
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload;
                const id = request.params.id;
                return this.db.update(id, payload)
            }
        }
    }
    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve deletar heroi',
                notes: 'Deve deletar heroi pelo id',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: (request, headers) => {
                const id = request.params.id;
                return this.db.delete(id)
            }
        }
    }

}

module.exports = HeroRoutes