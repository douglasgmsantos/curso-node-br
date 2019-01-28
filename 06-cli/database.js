const {readFile, writeFile} = require("fs")
const {promisify} = require("util")

const  readFileAsync = promisify(readFile);
const  writeFileAsync = promisify(writeFile);

class Database{

    constructor(){
        this.NAME_ARQUIVO = "heros.json";
    }

    async getDataFile(){
        const file = await readFileAsync(this.NAME_ARQUIVO, 'utf8');
        return JSON.parse(file.toString())
    }

    async register(hero){
        const data = await this.getDataFile()
        const id = hero.id <= 2 ? hero.id : Date.now()
        const heroId = {
            id,
            ...hero
        }
        const dataFinal = [
            ...data,
            heroId
        ]

        const result = await this.insertHeroFile(dataFinal)
         
        return result
    }
    
    async insertHeroFile(data){
        await writeFileAsync(this.NAME_ARQUIVO, JSON.stringify(data))
        return true
    }

    async list(id){
        const data = await this.getDataFile()
        const dataFilter = data.filter(hero => (id ? hero.id === id : true ))
        return dataFilter;
    }

    async removeById(id){
        if(!id){
            return await this.insertHeroFile([])
        }
        const data = await this.getDataFile();
        const index = data.findIndex(hero =>  hero.id === parseInt(id))
        
        if(index == -1){
            throw Error("O usuário informado não existe.ß")
        }

        data.splice(index, 1);
        await this.insertHeroFile(data)

        return true;
    }

    async updateById(id, newData){
        const data = await this.getDataFile();
        const index = data.findIndex( hero => hero.id === parseInt(id))

        if(index == -1){
            throw Error("O usuário informado não existe.ß")
        }

        const actual = data[index];
        const objUpdate = {
            ...actual,
            ...newData
        }
        
        data.splice(index, 1);
        
        return await this.insertHeroFile([
            ...data,
            objUpdate
        ])
    }

}

module.exports = new Database();