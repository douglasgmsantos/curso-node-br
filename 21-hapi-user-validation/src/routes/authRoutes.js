const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')

const failAction = function (request, h, err) {
    throw err;
}

const USER = {
    username: 'douglasgmsantos',
    password: '123'
}

class AuthRoutes extends BaseRoute {
    constructor(db, secret) {
        super()
        this.db = db
        this._secret = secret
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz login com user e senha do banco de dados.',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                },

            },
            handler: async (request, headers) => {
                const { username, password } = request.payload
                if (
                    username.toLowerCase() !== USER.username ||
                    password !== USER.password
                )
                    return Boom.unauthorized()

                const token = Jwt.sign({
                    username: username,
                    id: 1
                }, this._secret)
                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes