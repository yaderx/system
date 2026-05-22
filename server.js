const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));




const config = {
    user: "nodeuser",
    password: "1234",
    server: "localhost",
    port: 1433,
    database: "loginapp",
    options: {

        trustServerCertificate: true

    }
};



sql.connect(config)
.then(() => {

    console.log("SQL Server conectado");

})
.catch(err => {

    console.log("Error conectando SQL Server");
    console.log(err);

});




app.post("/login", async (req, res) => {

    const { correo, contra } = req.body;

    try {

        const result = await sql.query`

            SELECT *
            FROM administrador
            WHERE correo = ${correo}
            AND contra = ${contra}

        `;

        if(result.recordset.length > 0){

            res.json({
                success: true
            });

        } else {

            res.json({
                success: false
            });

        }

    } catch(err){

        console.log(err);

        res.json({
            success: false
        });

    }

});




app.get("/productos", async (req, res) => {

    try {

        const result = await sql.query`

            SELECT *
            FROM productos

        `;

        res.json(result.recordset);

    } catch(err){

        console.log(err);

        res.json([]);

    }

});




app.get("/grafica", async (req, res) => {

    try {

        const result = await sql.query`

            SELECT nombre, ventas
            FROM productos

        `;

        res.json(result.recordset);

    } catch(err){

        console.log(err);

        res.json([]);

    }

});




app.listen(3000, () => {

    console.log("Servidor iniciado en puerto 3000");
    
});
