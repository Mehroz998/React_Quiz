import React from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  let result = JSON.parse(localStorage.getItem("result"));
  let name = localStorage.getItem("name");
  let mode = localStorage.getItem("mode");
  let subject = localStorage.getItem("subject");
  let navigate = useNavigate();

  const handleRestart = () => {
    localStorage.removeItem('result')
    navigate("/questions");
  };

  const handleNewGame = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('result')
    localStorage.removeItem('subject')
    localStorage.removeItem('mode')
    navigate("/");
  };
  return (
    <>
      <div className="result p-4">
        <div className="text text-center mb-4">
          <h1 className="text-xl font-bold">
            Congratulations! {name}, you have got {result.percentage}%!
          </h1>
        </div>

        {/* Table for larger screens, stacked layout for small screens */}
        <div className="table">
          <div className="hidden md:block">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 font-bold ">
                  <td className="border border-black p-2 text-black">Total</td>
                  <td className="border border-black p-2 text-black">Mode</td>
                  <td className="border border-black p-2 text-black">Subject</td>
                  <td className="border border-black p-2 text-black">Correct Answers</td>
                  <td className="border border-black p-2 text-black">Wrong Answers</td>
                  <td className="border border-black p-2 text-black">Result</td>
                  <td className="border border-black p-2 text-black">Remarks</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2">{10}</td>
                  <td className="border border-black p-2">{mode}</td>
                  <td className="border border-black p-2">{subject}</td>
                  <td className="border border-black p-2">{result.correctAns}</td>
                  <td className="border border-black p-2">{result.wrongAns}</td>
                  <td className="border border-black p-2">{result.percentage}%</td>
                  <td className="border border-black p-2">{result.remarks}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Column-wise layout for smaller screens */}
          <div className="md:hidden">
            <div className="border border-gray-300 rounded-lg p-4 space-y-2">
              <p>
                <strong>Total:</strong> {10}
              </p>
              <p>
                <strong>Mode:</strong> {mode}
              </p>
              <p>
                <strong>Subject:</strong> {subject}
              </p>
              <p>
                <strong>Correct Answers:</strong> {result.correctAns}
              </p>
              <p>
                <strong>Wrong Answers:</strong> {result.wrongAns}
              </p>
              <p>
                <strong>Result:</strong> {result.percentage}%
              </p>
              <p>
                <strong>Remarks:</strong> {result.remarks}
              </p>
            </div>
          </div>
        </div>

        <div className="buttons flex flex-wrap justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
