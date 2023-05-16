// modulo que interactua  con la base de datos mysql relacional

const mysql = require('mysql')

//creamos la conexion
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

conexion.connect((error) => {
    if (error) {
        throw 'existe un error  en la cadena de conexion'
        console.log(`'hay un error:'${error}`)
    } else {
        console.log('conexion exitosa')
    }
})

//exportamos el modulo para usarlo como modulo principal

module.exports = conexion