
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// host, user, password, database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",//process.env.DBUSER,
    password: "MySQL Password",//process.env.DBPASSWORD,
    database: "ek_studieoptag"//process.env.DBNAME
});

// månedsløn for "J Information og kommunikation", y2024
app.get('/2024/it',(req, res)=>{
    connection.query('SELECT * FROM industry_data',(error,results)=>{
        let newResults = results[2]["y2024"]
        res.json({ y2024: newResults });
    });
});

// samlet gennemsnitlig månedsløn for alle sektorer der ikke er "J Information og kommunikation", y2024
app.get('/2024/otherSectors',(req, res)=>{
    connection.query('SELECT AVG(y2024) AS y2024 FROM industry_data WHERE industry != "J Information og kommunikation"',(error,results)=>{

        // results bliver { "y2024": "45642.0000" } - derfor parseInt() for at fjerne decimaler
        res.json({ y2024: parseInt(results[0].y2024) });
    });
});



// Query 2 - Sammenligning af IT uddannelser.
app.get('/studie/uddannelse', (req,res)=> {
    const query2 = `SELECT INSTITUTIONSAKT_BETEGNELSE, Køn, COUNT(*) AS Antal
                    FROM studie
                    WHERE INSTITUTIONSAKT_BETEGNELSE IN (
                                                         'Datamatiker',
                                                         'Økonomi og it',
                                                         'PB i IT-arkitektur',
                                                         'Multimediedesign',
                                                         'Designteknolog',
                                                         'PB indenfor Design og business')
                      AND Køn IN ('Kvinde', 'Mand')
                    GROUP BY INSTITUTIONSAKT_BETEGNELSE, Køn;`;
    connection.query(query2, (error, results) => {
        if (error) {
            res.status(500).send(error);
            return
        }
        res.send(results);
    });
});




app.listen(port, () =>{
    console.log(`Application is now running on port ${port}`);
});
