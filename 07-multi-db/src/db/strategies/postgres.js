const ICrud = require("./interfaces/ICrud")
class Postegres extends ICrud{
    constructor(){
        super()
    }


    create(item){
        console.log("O item foi salvo no Postgres")
    }
}

module.exports = Postegres