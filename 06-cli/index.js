const Commander = require("commander")
const Database = require("./database")
const Heroi = require("./heroi")

async function main() {
    Commander
        .version("v1")
        .option("-n, --name [value]", "Nome do Héroi")
        .option("-p, --power [value]", "Poder do Héroi")
        .option("-i, --id [value]", "ID do heroi")

        .option("-c, --register", "Cadastrar heroi")
        .option("-l, --list", "Listar heroi")
        .option("-d, --delete", "Remove o heroi pelo ID")
        .option("-u, --update [value]", "Atualize o heroi pelo ID")

        .parse(process.argv)
    
    const heroi = new Heroi(Commander)
    try{
        if(Commander.register){
            delete heroi.id
            const result = await Database.register(heroi)
            if(!result){
                console.error("Heroi não foi cadastrado.")
                return;
            }
            console.log("Heroi foi cadastrado cadastrado com sucesso.")
        }else if(Commander.list){
            console.log(await Database.list())
        }else if(Commander.delete){
            const result = await Database.removeById(heroi.id)
            if(!result){
                console.error("Não foi possível remover heroi.")
                return;
            }
            console.log("Heroi removido com sucesso.")
        }else{
            const id = parseInt(Commander.update)
            delete heroi.id

            //remover todas as chaves que estão undefined
            const data = JSON.stringify(heroi)
            const heroUpdate = JSON.parse(data)
            const result = await Database.updateById(id, heroUpdate)
            if(!result){
                console.error("Heroi não foi atualizado.")
                return;
            }

            console.log("Heroi foi atualizado.")

        }
    }catch(error){
        console.error("DEU RUIM", error)
    }
}

main()