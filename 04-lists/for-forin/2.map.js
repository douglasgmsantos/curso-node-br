const service = require("./service")

Array.prototype.meuMap = function (callback){
    const novoArrayMapeado = [];
    for(let indice = 0; indice <= this.length -1; indice++){
        const resultado = callback(this[indice], indice) 
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

async function main(params) {
    try{
        const response = await service.getPeople("a");
        //const names =[];

        // response.results.forEach(pessoa => {
        //     names.push(pessoa.name)
        // });

        // response.results.map( (pessoa) =>{
        //     names.push(pessoa.name);
        // })


        // const names = response.results.map( (pessoa) =>{ pessoa.name })

        const names = response.results.meuMap( (pessoa, indice) => {
            return `${indice} - ${pessoa.name}`
        })

        console.log("names", names)
    }catch(error){
        console.log("OCORREU ERROR", error)
    }
}
main()