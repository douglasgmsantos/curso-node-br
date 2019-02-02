const ICrud = require("../interfaces/ICrud")

class ContextStrategy extends ICrud{
    constructor(strategy){
        super();
        this._database = strategy;
    }

    connect(){
        return this._database.connect();
    }

    create(item){
        return this._database.create(item);
    }

    read(item){
        return this._database.read(item);
    }

    update(id, item){
        return this._database.update(id, item);
    }

    delete(id){
        return this._database.delete(id);
    }

    isConnected(){
        return this._database.isConnected();
    }
}

module.exports = ContextStrategy