import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  answers: string[];
  correct: string;
}

const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

  // Load questions from localStorage when the component mounts
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('question') || '[]');
    setQuestions(storedQuestions);
  }, []);

  // Function to add a new question to the list and update local storage
  const addQuestion = () => {
    if (currentQuestion && correctAnswerIndex !== null && options.every(option => option)) {
      const newQuestion: Question = {
        question: currentQuestion,
        answers: [...options],
        correct: options[correctAnswerIndex]
      };

      // Update state with the new question
      setQuestions(prevQuestions => [...prevQuestions, newQuestion]);

      // Clear input fields after adding the question
      setCurrentQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex(null);

      // Update local storage with the updated questions array
      localStorage.setItem('question', JSON.stringify([...questions, newQuestion]));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Question"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            className="p-2 border rounded"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
      </div>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded"
          value={correctAnswerIndex ?? ''}
          onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
        >
          <option value="" disabled>Select Correct Answer</option>
          {options.map((_, index) => (
            <option key={index} value={index}>{`Option ${index + 1}`}</option>
          ))}
        </select>
      </div>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={addQuestion}
      >
        Add Question
      </button>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Questions</h3>
        <ul>
          {questions.map((q, index) => (
            <li key={index} className="mb-2 p-2 border rounded">
              {q.question} - Correct Answer: {q.correct}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
