
// //databases
// show dbs

// //mudando contexto
// user herois

// // mostrar tabelas
// show collections

// db.herois.insert({
//     nome: 'Flash',
//     poder: 'Velocidade',
//     dataNascimento: '1998-01-01'
// })

// db.herois.find().pretty()

// for(let i = 0; i <= 100; i++){
//     db.herois.insert({
//         nome: `Clone - ${i}`,
//         poder: 'Velocidade',
//         dataNascimento: '1998-01-01'
//     })   
// }

// db.herois.count();
// db.herois.findOne();
// db.herois.find().limit(1000).sort({nome: -1});

// db.herois.find({}, {poder:1, _id:0})


// db.herois.find()

// db.herois.update(
//     { id: ObjectId("5c55c0f4497f533e37225f78")}, 
//     { nome: 'Mulher Maravilha'}
// )

// //Por padrão atualiza somente um
// db.herois.update(
//     { id: ObjectId("5c55c0f4497f533e37225f78")}, 
//     { $set: {nome: 'Lanterna Verde'}}
// )

// //delete
// db.herois.remove({})
// db.herois.remove({nome: 'Mulher Maravilha'})