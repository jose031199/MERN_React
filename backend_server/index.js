import express from 'express'
import mysql from 'mysql'

const app = express()

//Allow any client to send json file
app.use(express.json())
//Started mysql connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"America123",
    database:"test",
    port:3306
});

    app.get("/", (req, res) => {
        res.json("Hello this is the backend")
    })

    app.get("/books", (req, res) => {
        const q = "SELECT * FROM test.books";

        db.query(q,(err,data)=>{
            if (err) return res.json(err) 
            else return res.json(data)
        })
    });

    app.post("/books",(req, res)=>{
        const q = "INSERT INTO test.books (title,description,cover) VALUES(?)";

        const values = [
            req.body.title, 
            req.body.description, 
            req.body.cover
        ]

        db.query(q,[values],(err,data)=>{
            if (err) return res.json(err)
            else return res.json("Book has been added successfully")
        })

    })

    app.listen(8000,()=>{
        console.log(`Server started`)
    });

