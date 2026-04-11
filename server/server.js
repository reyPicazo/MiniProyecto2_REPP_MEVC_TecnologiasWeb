const express=require('express');
const cors=require('cors');
require('dotenv').config();

const app =express();
const PORT=process.env.PORT || 3000;

app.use(cors({
    origin:[
        'http://localhost:4200'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


app.use("/img", express.static("public/img"));

//Importación de rutas//

const healthcheckRoute=require("./routes/healthcheck.route");
app.use("/", healthcheckRoute);





app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en el puerto ${PORT}.`);
});
