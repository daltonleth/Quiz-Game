import React, {useState} from "react";
import Header from "./Header";
import Quiz from "./Quiz";
import questions from "../questions";
import Score from "./Score";
import $ from "jquery";
import axios from "axios";



function App() {
  let apiURL = "https://the-trivia-api.com/api/questions";
  let results;
  
  const [questionNumber, nextQuestion] = React.useState(1);
  const [points, addPoints] = React.useState(0);
  const [post, setPost] = React.useState(null);
  
  React.useEffect(() => {
    axios.get(apiURL).then((response) => {
      setPost(response.data);
    });
  }, []);
  function handleAnswer(answer) {
    // console.log(answer);
    if(answer === correctAnswer) {
      // console.log("Correct");
      addPoints(points + 1);
    } else {
      // console.log("incorrect!");
    }
    nextQuestion(questionNumber + 1);
  }

  function reloadWindow() {
    window.location.reload();
  }
  
  if (!post) return null;
  
  

  
  
  // console.log(post);
  // console.log(post.results);
  results = post;

  var questionObject = results[questionNumber - 1];

  var question = questionObject.question;
  var correctAnswer = questionObject.correctAnswer;
  var answers = questionObject.incorrectAnswers;
  answers.push(questionObject.correctAnswer);
  // console.log(answers);
  answers = answers.filter(n => n);
  answers.sort(() => Math.random() - 0.5);
  // const question = 'What is the capital of France?';
  // const answers = ['Paris', 'London', 'Rome', 'Madrid'];


  return (<div className="container-fluid">
<Header text="Quiz Game" />

{questionNumber >= results.length ? <Score score={points} totalQuestions={results.length} restartFunction={reloadWindow} /> : <div>
<h3>Points: {points}</h3>
<Quiz question={question} answers={answers} onAnswerSelected={handleAnswer} /></div>}
  </div>);
}

export default App;