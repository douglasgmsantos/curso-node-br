const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

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
            config: {
                tags: ['api'],
                description: 'listar herois',
                notes: 'retorna a base inteira de herois',
                validate:{
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100),
                    },
                    failAction,
                    headers
                }
            },
            handler: (request, headers) => {
                try{
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                    const query = {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    }

                    return this.db.read(nome ? query : {}, skip, limit)
                }catch(error){
                    console.log('DEU RUIM', error)
                    return Boom.internal()
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
                description: 'cadastrar herois',
                notes: 'Cadastra um heroi por nome e poder',
                validate: {
                    failAction,
                    headers,
                    payload: {
                        nome: Joi.string().max(100).required(),
                        poder: Joi.string().max(30).required()
                    }
                },

            },
            handler: (request) => {
                const {nome, poder} = request.payload
                const payload = request.payload
                return this.db.create({nome, poder})
            }
        }
    }
    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'atualizar herois',
                notes: 'atualiza um heroi por ID',
                validate: {
                    failAction,
                    headers,
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().max(100),
                        poder: Joi.string().max(30)
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
                description: 'remover herois',
                notes: 'remove um heroi por id',
                validate: {
                    failAction,
                    headers,
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