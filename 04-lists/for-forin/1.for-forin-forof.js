const service = require('./service');

async function main() {
    try{
        const response = await service.getPeople('a');
        const names = [];

        console.time("For")
        for(let i = 0; i <= response.results.length -1; i++){
            const pessoa = response.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd("For")

        console.time("for in")
        for(let i in response.results){
            const pessoa = response.results[i];
            names.push(pessoa.name)
        }
        console.timeEnd("for in")
        
        console.time("for of")
        for(let pessoa of response.results){
            names.push(pessoa.name)
        }
        console.timeEnd("for of")

        //console.log("names", names);

    }catch(error){
        console.error("OPS DEU ERRO", error)
    }
}

main();