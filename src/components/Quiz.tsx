import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('question');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <p>Your score is {score} out of {questions.length}</p>
        <button
          className="p-2 bg-blue-500 text-white rounded mt-4"
          onClick={restartQuiz}
        >
          Restart Quiz
        </button>
        <div className="mt-4">
          {questions.map((q, index) => (
            <div key={index} className="mb-2 p-2 border rounded">
              <p>{q.question}</p>
              <p>Your answer: {q.options[answers[index]]}</p>
              <p>Correct answer: {q.options[q.correctAnswer]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      {questions.length > 0 ? (
        <div>
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className="p-2 bg-gray-200 rounded"
                onClick={() => answerQuestion(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default Quiz;
