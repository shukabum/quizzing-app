import React, { useState } from 'react';
import Leaderboard from './Leaderboard';

const Quiz = ({ quizType, student, updateLeaderboard,onLogout,leaderboard,viewOnly   }) => {
  const [questions,setquestions] = useState(generateQuestions(quizType));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const handleLogout = () => {
    onLogout();
  };

  const handleAnswer = (isCorrect) => {
        if (isCorrect) {
        setScore(score + 1);
        }
    
        if (currentQuestion === questions.length -1) {
            updateLeaderboard(student, score + (isCorrect ? 1 : 0));
        
            setQuizFinished(true);
        } else {
        setCurrentQuestion(currentQuestion + 1);
        }
    }

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setScore(0); 
    setQuizFinished(false); 
  };

  return (
    <div className="quiz-container">
      <span style={{
        display:"flex",
        justifyContent: "space-between",
        alignItems:'center'
      }}>
      <h2>{quizType}</h2>
      <button onClick={handleLogout} style={{
        height:'fit-content',
        background:"red"
      }}>Logout</button>
        </span>
      {!quizFinished &&!viewOnly ? (
        <div>
          <p className='quiz-question'>Question {currentQuestion + 1}: {questions[currentQuestion].question}</p>
          <ol type="A" className='quiz-options'>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}  onClick={() =>handleAnswer(option.isCorrect)} >
                {option.text}
              </li> 
            ))}
          </ol>
        </div>
      ) : (
        <div>
            <p style={{
                fontFamily:'monospace',
                fontWeight:'900',
                fontSize:"1.2rem"

            }}>Quiz Completed! Your Score: {score}</p>
           
        <Leaderboard leaderboard={leaderboard} />
      </div>
      )}
    </div>
  );
};

const generateQuestions = (quizType) => {  
  
    switch (quizType) {
      case 'Quiz 1':
        const quiz1Questions = [
            {
                question: 'What is the capital of France?',
                options: [
                  { text: 'Berlin', isCorrect: false },
                  { text: 'Paris', isCorrect: true },
                  { text: 'London', isCorrect: false },
                  { text: 'Rome', isCorrect: false },
                ],
            },
            {
                question: 'Which planet is known as the Red Planet?',
                options: [
                  { text: 'Mars', isCorrect: true },
                  { text: 'Venus', isCorrect: false },
                  { text: 'Jupiter', isCorrect: false },
                  { text: 'Saturn', isCorrect: false },
                ],
              },
              {
                question: 'What is the largest mammal?',
                options: [
                  { text: 'Elephant', isCorrect: false },
                  { text: 'Blue Whale', isCorrect: true },
                  { text: 'Giraffe', isCorrect: false },
                  { text: 'Hippopotamus', isCorrect: false },
                ],
              },
              {
                question: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Vincent van Gogh', isCorrect: false },
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Pablo Picasso', isCorrect: false },
                  { text: 'Claude Monet', isCorrect: false },
                ],
              },
              {
                question: 'Which is the largest ocean on Earth?',
                options: [
                  { text: 'Atlantic Ocean', isCorrect: false },
                  { text: 'Indian Ocean', isCorrect: false },
                  { text: 'Southern Ocean', isCorrect: false },
                  { text: 'Pacific Ocean', isCorrect: true },
                ],
              },
        ];
        return quiz1Questions;
  
      case 'Quiz 2':
        const quiz2Questions = [
            {
                question: 'What is the capital of Japan?',
                options: [
                  { text: 'Seoul', isCorrect: false },
                  { text: 'Beijing', isCorrect: false },
                  { text: 'Tokyo', isCorrect: true },
                  { text: 'Bangkok', isCorrect: false },
                ],
              },
              {
                question: 'Who developed the theory of general relativity?',
                options: [
                  { text: 'Isaac Newton', isCorrect: false },
                  { text: 'Albert Einstein', isCorrect: true },
                  { text: 'Stephen Hawking', isCorrect: false },
                  { text: 'Galileo Galilei', isCorrect: false },
                ],
              },
              {
                question: 'What is the capital of Australia?',
                options: [
                  { text: 'Sydney', isCorrect: false },
                  { text: 'Melbourne', isCorrect: false },
                  { text: 'Canberra', isCorrect: true },
                  { text: 'Brisbane', isCorrect: false },
                ],
              },
              {
                question: 'Which gas do plants absorb from the atmosphere?',
                options: [
                  { text: 'Oxygen', isCorrect: false },
                  { text: 'Nitrogen', isCorrect: false },
                  { text: 'Carbon Dioxide', isCorrect: true },
                  { text: 'Hydrogen', isCorrect: false },
                ],
              },
              {
                question: 'What is the currency of Brazil?',
                options: [
                  { text: 'Peso', isCorrect: false },
                  { text: 'Dollar', isCorrect: false },
                  { text: 'Real', isCorrect: true },
                  { text: 'Euro', isCorrect: false },
                ],
              },
        ];
        return quiz2Questions;
  
      case 'Quiz 3':
        const quiz3Questions = [
            {
                question: 'Who wrote "Romeo and Juliet"?',
                options: [
                  { text: 'Charles Dickens', isCorrect: false },
                  { text: 'Jane Austen', isCorrect: false },
                  { text: 'William Shakespeare', isCorrect: true },
                  { text: 'Mark Twain', isCorrect: false },
                ],
              },
              {
                question: 'In which year did World War I begin?',
                options: [
                  { text: '1914', isCorrect: true },
                  { text: '1920', isCorrect: false },
                  { text: '1939', isCorrect: false },
                  { text: '1945', isCorrect: false },
                ],
              },    
              {
                question: 'Who is the author of "To Kill a Mockingbird"?',
                options: [
                  { text: 'George Orwell', isCorrect: false },
                  { text: 'J.K. Rowling', isCorrect: false },
                  { text: 'Harper Lee', isCorrect: true },
                  { text: 'Ernest Hemingway', isCorrect: false },
                ],
              },
              {
                question: 'Which element has the chemical symbol "H"?',
                options: [
                  { text: 'Helium', isCorrect: false },
                  { text: 'Hydrogen', isCorrect: true },
                  { text: 'Hassium', isCorrect: false },
                  { text: 'Hafnium', isCorrect: false },
                ],
              },
              {
                question: 'In what year did the Titanic sink?',
                options: [
                  { text: '1912', isCorrect: true },
                  { text: '1905', isCorrect: false },
                  { text: '1925', isCorrect: false },
                  { text: '1937', isCorrect: false },
                ],
              },
        ];
        return quiz3Questions;
  
      default:
        return [];
    }
  };

export default Quiz;
