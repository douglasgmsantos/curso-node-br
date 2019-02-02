const Context = require("./db/strategies/base/ContextStrategy")
const MongoDB = require("./db/strategies/mongodb")
const Postegres = require("./db/strategies/postgres")


const contextM = new Context(new MongoDB())
contextM.create("item")

const contextP = new Context(new Postegres())
contextP.create("item")