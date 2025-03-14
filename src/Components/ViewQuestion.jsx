import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const ViewQuestion = () => {
    let navigate = useNavigate()
    let [correctAns, setCorrectAns] = useState(0);
    let [data, setData] = useState([]);
    let [num , setNum ] = useState(0)
    let [correctColor , setCorrectColor] = useState(false)
    const [timer , setTimer] = useState(15)
    const [isLoading , setIsLoading] = useState(true)
    const mode = localStorage.getItem('mode').toLowerCase()
    const subject = localStorage.getItem('subject')
    let result;

    
    
    let category;
    if(subject === 'History'){
        category = 23
    }else if(subject === 'Computer'){
        category = 18
    }else if(subject === 'Mathematics'){
        category = 19
    }else{
        category = 9
    }
    

    const decodeHtmlEntities = (text) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(text, "text/html").body.textContent;
        return decodedString;
      };

    function shuffleArray(array) {
        return array
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      }
    async function getData() {
        try {
            let res = await fetch(`https://opentdb.com/api.php?amount=${category===19?10:30}&category=${category}&difficulty=${mode}&type=multiple`);
            res = await res.json();           
            const shuffledArray = shuffleArray(res.results);
            const randomTenElements = shuffledArray.slice(0, 10);
            setData(randomTenElements);
            setIsLoading(false)
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    useEffect(() => {
        if (num > 9) {
            navigate('/result');
        }
    }, [num]);

       // Timer
       useEffect(() => {
        if(isLoading) return
        if (timer === 0) {
            toast.error('Opps Timeout ',{
                position:"top-center",
                autoClose:1000,
                pauseOnHover:false   
            })
            setCorrectColor(true)
            setTimeout(()=>{
                setNum((prev) => prev + 1);// Automatically go to next question
                setTimer(15) 
                setCorrectColor(false)
            },2000)
            return;
        }

        const sec = setInterval(() => {
            setTimer(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(sec); // Cleanup
    }, [timer , isLoading]);

    if (isLoading || num >= data.length || !data[num]) {
        return <div>Loading question...</div>;
    }
    

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }
    

    const question = data[num];
    const options = [...question.incorrect_answers , question.correct_answer]
    

    const handleClick = (e) => {
        const clickedOption = e.target.closest('.option').querySelector('h4').innerText;      
        if (clickedOption === question.correct_answer) {
            e.target.closest('.option').classList.add('correct');
            e.target.closest('.option').classList.remove('hover')
            setCorrectAns((prev) => prev + 1);
            setTimeout(() => {
                e.target.closest('.option').classList.remove('correct');
                e.target.closest('.option').classList.add('hover')
                setNum((prev) => prev + 1);
            }, 800);
        } else {
            e.target.closest('.option').classList.add('incorrect');
            e.target.closest('.option').classList.remove('hover')
            setTimeout(() => {
                e.target.closest('.option').classList.remove('incorrect');
                e.target.closest('.option').classList.add('hover')
                setNum((prev) => prev + 1);
            }, 800);
        }
        setTimer(15)
        
    }

    result = {
        correctAns,
        percentage:(correctAns*100)/10,
        wrongAns:10-correctAns
    }

    if(result.percentage >= 70){
        result['remarks'] = 'Excellent' 
    }
    else if(result.percentage >=50 || result.percentage >= 35){
        result['remarks'] = 'Good'
    }
    else{
        result['remarks'] = 'Fail'
    }

    if(num >= 9){
        localStorage.setItem('result',JSON.stringify(result))
    }

    const new_options =  options.map((option)=>{
        return decodeHtmlEntities(option)
    })

 

    return (
        <>
            <div className="no">{num+1}/10</div>
            <span className="countdown bg-white px-4 py-2 text-black text-xl font-bold rounded-full">
                {timer}
            </span>
            <div className="w-[90%] md:w-1/2 h-[200px] border-2 border-white overflow-auto p-[10px] mt-[10px] rounded-xl">
                <h3>{decodeHtmlEntities(question.question)}</h3>
            </div>
            {new_options.sort().map((e, i) => (
                <div className={`w-[90%] md:w-1/2 option ${correctColor && e === question.correct_answer&&'correct'}`} onClick={(e)=>handleClick(e)} key={i}>
                    <h4>{e}</h4>
                </div>
            ))}
        </>
    );
};

export default ViewQuestion;
