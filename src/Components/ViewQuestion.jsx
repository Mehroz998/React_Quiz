import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewQuestion = () => {
    let navigate = useNavigate()
    let [correctAns, setCorrectAns] = useState(0);
    let [data, setData] = useState([]);
    let [num , setNum ] = useState(0)
    let result;

    function shuffleArray(array) {
        return array
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      }

    async function getData() {
        try {
            let res = await fetch('http://localhost:3031/quiz');
            let result = await res.json();
            const shuffledArray = shuffleArray(result);
            const randomTenElements = shuffledArray.slice(0, 10);
            setData(randomTenElements);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (num > 9) {
            navigate('/result');
        }
    }, [num]);

    if (num >= data.length) {
        return <div>Loading next question...</div>;
    }

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    const question = data[num];

    const handleClick = (e) => {
        const clickedOption = e.target.closest('.option').querySelector('h4').innerText;
        
        
        if (clickedOption === question.correctOption) {
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


    return (
        <>
            <div className="no">{num+1}/10</div>
            <div className="question">
                <h3>{question.question}</h3>
            </div>
            {question.options.map((e, i) => (
                <div className={`option hover`} onClick={(e)=>handleClick(e)} key={i}>
                    <h4>{e}</h4>
                </div>
            ))}
        </>
    );
};

export default ViewQuestion;
