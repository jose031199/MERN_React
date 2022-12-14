import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Update = () => {

  const [books,setBooks] = useState({
    title:'',
    description:'',
    cover:'',
    price:0
  });

  const [showBooks,setShowBooks] = useState([])




  const navigate = useNavigate();
  const location = useLocation()
  let IdBooks = location.pathname.split("/")[2]
  //console.log(IdBooks)


  useEffect(()=>{
    const fetch = async() => {
      try {
        let idBooks = window.location.href.split("/")[4] 
        const  response = await axios.get("http://localhost:8000/books/"+idBooks)
        setShowBooks(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  },[])

  const handleChanged=(e) => {
    console.log(e.target.value)
    //setBooks((prevBooks) => ({...prevBooks,[e.target.name]:e.target.value}))
    console.log(books)
  }

  const handleClick=async(e)=>{
    e.preventDefault();

    try {
      await axios.put("http://localhost:8000/books/"+IdBooks,books)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="form">
        <h1>Update Book</h1>
            {showBooks.map(showBook=>(

            <div className="form" key={showBook.IdBooks}>
              <input type="text" placeholder="title" name="title" onChange={handleChanged}
              value={showBook.title}></ input>
              <input type="text" placeholder="description" name="description" onChange={handleChanged}value={showBook.description}></input>
              <input type="text" placeholder="cover" name="cover" onChange={handleChanged} value={showBook.cover}></input>
              <input type="number" placeholder="Price" name="Price" onChange={handleChanged} value={showBook.Price}></input> 
            </div>
            ))}
        <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update