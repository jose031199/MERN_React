import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import  Swal from 'sweetalert2'


const Books = () => {

  const [books,setBooks] = useState([]);

  useEffect(()=>{
    const fetch = async () =>{
      try {
        const response = await axios.get('http://localhost:8000/books')
        setBooks(response.data)
        //console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  },[])

  const IshandleDelete = (IdBooks)=>{
      Swal.fire({
        title:`You want to delete the id ? ${IdBooks}`,
        Text: 'Once is deleted it wont be returned',
        icon:'error',
        showCancelButton:true,
        showConfirmButton:false,
        showDenyButton:true,
        denyButtonText:`Delete book ${IdBooks}`,
        cancelButtonColor:'#DFDFDE',
        denyButtonColor:'#B20600'
      }).then(result => {
        if(result.isDenied) {
          handleDelete(IdBooks);
        }
      })

  }

  const handleDelete = async(IdBooks)=>{
    try {
      await axios.delete('http://localhost:8000/books/'+IdBooks)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Jose Book Shop</h1>
      <div className="books">
        {books.map(book=>(
          <div className="book" key={book.IdBooks}>
            {book.cover && <img src={book.cover} alt=""></img>}
            <h2>{book.title}</h2>
            <h2>{book.description}</h2>
            <span>{book.Price}</span>
            <button className="delete" onClick={()=>IshandleDelete(book.IdBooks)}>Delete</button>
            <button className="update"><Link to={`/update/${book.IdBooks}`}>Update</Link></button>

          </div>
        ))}
      </div>
      <button className='btn btn-bg-red'><Link to={"/add"}>Add New Book</Link></button>
    </div>
  )
}

export default Books
