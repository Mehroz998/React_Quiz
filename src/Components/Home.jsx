import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const [name, setName]= useState('')
    let localname = localStorage.getItem('name')
    const navigate = useNavigate()
    
    function handleStart(){
        if(name === localname){
            navigate('/result')
        }
        else{
            if(name){
                localStorage.setItem('name',name)
                setName('')
                navigate('/questions')
            }
            else{
                alert("Name is Required")
            }
        }
        
    }
  return (
    <>
        <div className='Home'>
            <h1>WELCOME TO THE QUIZ APP</h1>
            <p>Please Enter Your Name</p>
            <input type="text" placeholder='Eg: Mehroz Ali' value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={handleStart}>Start</button>
        </div>
    </>
  )
}

export default Home;
