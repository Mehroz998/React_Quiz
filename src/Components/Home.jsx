import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {toast } from 'react-toastify';

const Home = () => {
    const [name, setName]= useState('')
    const [subject, setSubject]= useState('')
    const [mode , setMode] = useState('')
    let localname = localStorage.getItem('name')
    let localsubject = localStorage.getItem('subject')
    let localmode = localStorage.getItem('mode')
    const navigate = useNavigate()
    
    function handleStart(){
        if(name === localname && subject === localsubject && mode === localmode){
            navigate('/result')
        }
        else{
            if(name && subject){
                localStorage.setItem('name',name)
                localStorage.setItem('subject',subject)
                localStorage.setItem('mode',mode)
                setName('')
                setSubject('')
                setMode('')
                navigate('/questions')
                toast.success(`All the Best ${name.toUpperCase()}` ,{
                    position:'top-center',
                    autoClose:1000,
                    pauseOnHover: false,
                })
            }
            else{
                toast.error('All Fields are Required',{
                    position:'top-center',
                    autoClose:1000,
                    pauseOnHover: false,
                })
            }
        }
        
    }
  return (
    <>
        <div className='Home mx-10'>
            <h1 className='text-4xl'>WELCOME TO THE QUIZ APP</h1>
            <p>Please Enter Information</p>
            <input type="text" className="input input-bordered w-full mb-3 text-black" placeholder='Eg: Mehroz Ali' value={name} onChange={(e)=>setName(e.target.value)}/>
            <select className="select select-bordered w-full text-black mb-3"value={subject} onChange={(e)=>setSubject(e.target.value)}>
                <option disabled selected className='text-black'>Select Your Subject</option>
                <option className='text-black'>General Knowledge</option>
                <option className='text-black'>Computer</option>
                <option className='text-black'>Mathematics</option>
            </select>
            <select className="select select-bordered w-full text-black "value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option disabled selected className='text-black'>Difficulty</option>
                <option className='text-black'>Easy</option>
                <option className='text-black'>Medium</option>
                <option className='text-black'>Hard</option>
            </select>
            <button onClick={handleStart}>Start</button>
        </div>
    </>
  )
}

export default Home;
