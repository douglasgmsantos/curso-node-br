//Importando um modulo interno do node js
const util = require('util')
const getAddressAsync = util.promisify(getAddressById);

function getUser(callback){

    return new Promise( (resolve, reject) => {
        setTimeout(()=>{
            resolve({
                id: 1,
                nome: "DOUGLAS"
            })
        },1000)
    })
}

function getPhoneById(id){
    return new Promise( (resolve, reject) =>{
        setTimeout(()=>{
            resolve({
                id: 1,
                phone: 961845895
            })
        },2000)
    })
}

function getAddressById(id, callback){
    return new Promise( (resolve, reject) =>{
        setTimeout(()=>{
            callback(null,{
                id: 1,
                address: "RUA ILDA LAURA FRACAROLLI"
            })
        },2000)
    })
}

// DEMOSTRAÇÃO COM ASYNC/AWAIT
main();
async function main(){
    try{
        console.time("time-promisse");
        
        const user = await getUser();
        // const phone = await getPhoneById(user.id);
        // const address = await getAddressAsync(user.id);

        const response = await Promise.all([
            getPhoneById(user.id),
            getAddressAsync(user.id)
        ])

        console.log({
            user: user,
            phone: response[0],
            address: response[1],
        })

        console.timeEnd("time-promisse")
        
    }catch(error){
        console.log("DEU RUIM")
    }
}


// MODELO PROMISSES
// const user = getUser();

// user
//     .then( (user) =>{
//         return getPhoneById(user.id)
//             .then( (result) => {
//                 return {
//                     user : user,
//                     phone: result
//                 }
//             })
//     })
//     .then( (response) =>{
//         const address = getAddressAsync(response.user.id)
//             .then( (address)=>{
//                 response["address"] = address;
//                 return response
//             });
//         return address;
//     }) 
//     .then( (resultado) =>{
//         console.log("resultado", resultado);
//     })
//     .catch( (error) =>{
//         console.error("DEU RUIM", error)
//     })




// MODELO DE CALLBACK
// getUser((error, user) => {
//     if(error){
//         console.error("DEU RUIM NO USUARIO");
//         return;
//     }

//     console.log("user", user)
//     getPhoneById(user.id, (error1, phone) =>{
//         if(error1){
//             console.error("DEU RUIM NO USUARIO")
//             return;
//         }

//         console.log("phone", phone)
//     })
// });
