const { getPeople } = require("./service")

Array.prototype.meuFilter = function (callback){
    const lista = [];
    for( index in this){
        const item = this[index]   
        const result = callback(item, this)
        if(!result) continue;
        lista.push(item)
    }

    return lista;
}


async function main() {
    try{
        const { results } = await getPeople("a")
        // const family = results.filter( (people) =>{
        //     return people.name.toUpperCase().indexOf("LARS") !== -1
        // })

        const family = results.meuFilter( (people) =>{ return people.name.toUpperCase().indexOf("LARS") !== -1 })

        const names  = family.map( (pessoa) => pessoa.name)
        console.log(names)

    }catch(error) {

        console.error("Ocorreu um erro ", error)
    }
}

main()