import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

//Allow any client to send json file and to croos origin
app.use(express.json())
app.use(cors())
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


    //App to display info of books
    app.get("/books", (req, res) => {
        const q = "SELECT * FROM test.books";

        db.query(q,(err,data)=>{
            if (err) return res.json(err) 
            else return res.json(data)
        })
    });

    //App to update 
    app.post("/books",(req, res)=>{
        const q = "INSERT INTO test.books (title,description,cover,Price) VALUES(?)";

        const values = [
            req.body.title, 
            req.body.description, 
            req.body.cover,
            req.body.Price
        ]

        db.query(q,[values],(err,data)=>{
            if (err) return res.json(err)
            else return res.json("Book has been added successfully" +values)
        })

    });


    //App to delete book
    app.delete('/books/:id?',(req,res)=>{
        const bookId = req.params.id;
        console.log(bookId)
        const q = `DELETE FROM test.books WHERE IdBooks=?`
        db.query(q,[bookId],(err,data)=>{
            if (err) return res.json(err);
            else return res.json("Book has been deleted")
        });
    })

    //App to show Book to update
    app.get('/books/:id?',(req,res)=>{
        const q = "SELECT * FROM test.books WHERE IdBooks=?"
        const booksId = req.params.id;

        db.query(q,[booksId],(err,data)=>{
            if(err) return res.json(err)
            else return res.json(data)
        })
    })

    //App to update book
    app.put('/books/:id?',(req,res)=>{
        const bookId = req.params.id;
        //console.log(bookId)

        const values = [
            req.body.title, 
            req.body.description, 
            req.body.cover,
            req.body.Price
        ]        

        const q = `UPDATE test.books SET title=?,description=?,cover=?,Price=? 
        WHERE IdBooks=?`;
        db.query(q,[...values,bookId],(err,data)=>{
            if (err) return res.json(err);
            else return res.json("Book has been updated")
        });
    })

    app.listen(8000,()=>{
        console.log(`Server started`)
    });

