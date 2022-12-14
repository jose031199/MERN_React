import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const AddBooks = () => {

  const [books,setBooks] = useState({
    title:'',
    description:'',
    cover:'',
    price:0
  });

  const navigate = useNavigate();

  const handleChanged=(e) => {
    setBooks((prevBooks) => ({...prevBooks,[e.target.name]:e.target.value}))
    console.log(books)
  }

  const handleClick=async(e)=>{
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/books",books)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="form">
        <h1>Add Book</h1>
          <input type="text" placeholder="title" name="title" onChange={handleChanged}></input>
          <input type="text" placeholder="description" name="description" onChange={handleChanged}></input>
          <input type="text" placeholder="cover" name="cover" onChange={handleChanged}></input>
          <input type="number" placeholder="Price" name="Price" onChange={handleChanged}></input>

        <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  )
}

export default AddBooks