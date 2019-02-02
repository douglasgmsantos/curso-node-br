// npm install sequelize pg-hstore pg

const Sequelize = require('sequelize');
const drive = new Sequelize(
    'heroes',
    'douglasgmsantos',
    '123456',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    }
)

async function  main() {
    const Herois = drive.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome:{
            type: Sequelize.STRING,
            required: true
        },
        poder:{
            type: Sequelize.STRING,
            required: true
        }

    },{
      tableName: "TB_HEROIS",
      freezeTableName: false,
      timestamps: false   
    })

    await Herois.sync();

    const result = await Herois.findAll({
        raw: true,
        atrributes: ['nome']
    })

    console.log("result", result)
}

main()