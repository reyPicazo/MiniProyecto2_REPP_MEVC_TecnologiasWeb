require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mysql=require('mysql2/promise');


const app =express();
const PORT=process.env.PORT || 3000;

const db = mysql.createPool(process.env.DATABASE_URL);

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar con Railway:', err);
    } else {
        console.log('Conectado exitosamente a la base de datos de Railway');
        connection.release();
    }
});

module.exports = db;

app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user']
}));

//Usamos este para las conexines locales en caso de que asi se haya implementado
/*
app.use(cors({
    origin:[
        'http://localhost:4200'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user']
}));*/


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


const mensajesRoute=require("./routes/mensajes.route");
app.use("/mensajes", mensajesRoute);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en el puerto ${PORT}.`);
});


