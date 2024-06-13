import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  question: string;
  answers: string[];
  correct: string;
}

const PlayQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [mode, setMode] = useState<'home' | 'play' | 'create'>('home');

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('question') || '[]');
    setQuestions(storedQuestions);
  }, []);

  const handleAnswerOptionClick = (answer: string) => {
    setSelectedAnswer(answer);
    setUserAnswers([...userAnswers, answer]);

    if (answer === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
    }
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  const handleModeChange = (newMode: 'home' | 'play' | 'create') => {
    setMode(newMode);
  };

  if (mode === 'home') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-gray-900 mb-4">Choose an Option</div>
          <div className="flex flex-col">
            <button
              className="p-4 mb-4 bg-blue-500 text-white rounded-md transition ease-in-out duration-150 hover:bg-blue-600"
              onClick={() => handleModeChange('play')}
            >
              Play Quizzes
            </button>
           <button  className="p-4 bg-green-500 text-white rounded-md transition ease-in-out duration-150 hover:bg-green-600">
           <Link
              to="/admin"
             
            
            >
              Create Quizzes
            </Link>
           </button>
          </div>
        </div>
      </div>
    );
  }

 
  if (questions.length === 0) {
    return <div className="text-center">Loading questions...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        {showScore ? (
          <>
            <div className="text-2xl font-bold text-gray-900 mb-4">
            <img src="https://img.freepik.com/free-vector/birthday-cap-with-confetti-serpentine-explosion_1017-17924.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais" alt="" />  You scored {score} out of {questions.length}
            </div>
            {!showAnswers ? (
              <button
                className="p-2 bg-green-500 text-white rounded-md"
                onClick={handleShowAnswers}
              >
                Show Correct Answers
              </button>
            ) : (
              <div className="mt-4">
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <div className="font-bold">{question.question}</div>
                    <div className="flex flex-col">
                      {question.answers.map((answer) => (
                        <div
                          key={answer}
                          className={`p-2 m-2 rounded-md transition ease-in-out duration-150 ${
                            answer === question.correct ? 'bg-green-100' : 'bg-gray-100'
                          } ${userAnswers[index] === answer ? 'border-2 border-green-500' : ''}`}
                        >
                          {answer}
                        </div>
                      ))}
                    </div>
                    <div>
                      Your Answer: 
                      <span className={`font-bold ml-2 ${userAnswers[index] === question.correct ? 'text-green-500' : 'text-red-500'}`}>
                        {userAnswers[index]}
                      </span>
                    </div>
                    <div>
                      Correct Answer: <span className="text-green-500 font-bold">{question.correct}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              {questions[currentQuestionIndex].question}
            </div>
            <div className="flex flex-col">
              {questions[currentQuestionIndex].answers.map((answer) => (
                <button
                  key={answer}
                  className={`flex items-center gap-2 border border-gray-900 cursor-pointer rounded-lg p-3 ring-offset-2 ring-2 mt-3 ${
                    selectedAnswer === answer ? 'bg-[#bcf3ddb6]' : 'bg-gray-100'
                  }`}
                  onClick={() => handleAnswerOptionClick(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <button
                className="p-2 mt-4 bg-blue-500 text-white rounded-md transition ease-in-out duration-150 hover:bg-blue-600"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlayQuiz;
