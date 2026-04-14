const express=require('express');
const cors=require('cors');
//const mysql=require('mysql2');
require('dotenv').config();

const app =express();
const PORT=process.env.PORT || 3000;

// Configuración de la conexión a la base de datos
/*const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});*/

app.use(cors({
    origin:[
        'http://localhost:4200'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user']
}));
app.use(express.json());

const path = require("path");

app.use("/img", express.static(path.join(__dirname, "assets/img/productos")));


//Importación de rutas//

const healthcheckRoute=require("./routes/healthcheck.route");
app.use("/", healthcheckRoute);

const productosRoute=require("./routes/productos.route");
app.use("/productos", productosRoute);

const compraRoute=require("./routes/compra.route");
app.use("/compra", compraRoute);




app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en el puerto ${PORT}.`);
});
