import React from 'react'
import { useNavigate } from 'react-router-dom'

const Result = () => {
    let result = JSON.parse(localStorage.getItem('result'))
    let name = localStorage.getItem('name')
    let navigate = useNavigate()
    
    const handleRestart = ()=>{
        navigate('/questions')
    }

    const handleNewGame = ()=>{
        // localStorage.removeItem('name')
        // localStorage.removeItem('result')
        navigate('/')
    }
  return (
    <>
        <div className="result">
            <div className="text">
                <h1>Congratulations! {name}, you have got {result.percentage}%!</h1>
            </div>
            <div className="table">
                <table style={{width:"100%"}}>
                    <tr style={{fontWeight:"bold"}}>
                        <td>Total</td>
                        <td>Correct Answers</td>
                        <td>Wrong Answers</td>
                        <td>Result</td>
                        <td>Remarks</td>
                    </tr>
                    <tr>
                        <td>{10}</td>
                        <td>{result.correctAns}</td>
                        <td>{result.wrongAns}</td>
                        <td>{result.percentage}%</td>
                        <td>{result.remarks}</td>
                    </tr>
                </table>  
            </div>
            <div className="buttons">
                <button onClick={handleRestart}>Restart</button>
                <button onClick={handleNewGame}>NewGame</button>
            </div>
        </div>
    </>
  )
}

export default Result