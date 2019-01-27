const { getPeople } = require("./service")

async function main() {
    try{
        const { results } = await getPeople("a")
        const pesos = results.map( people => parseInt(people.height))
        console.log("pesos", pesos)

        const total = pesos.reduce( (anterior, proximo) => { return anterior + proximo}, 0)
        console.log("total", total)

    }catch(error) {
        console.error("Ocorreu um erro ", error)
    }
}

main()