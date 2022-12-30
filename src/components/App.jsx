import React, {useState} from "react";
import Header from "./Header";
import Quiz from "./Quiz";
import Score from "./Score";
import axios from "axios";



function App() {
  let apiURL = "https://the-trivia-api.com/api/questions";
  let results;
  
  const [questionNumber, nextQuestion] = useState(1);
  const [points, addPoints] = useState(0);
  const [post, setPost] = useState(null);
  const [appAreaStyle, setStyle] = useState({
    backgroundColor: "",
  })
  
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
      setStyle({
        backgroundColor: "#D57864",
      });
      setTimeout( () => {
        setStyle({
        backgroundColor: "",
      });
    }, 150);
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


  return (<div className="container-fluid appArea" style={appAreaStyle}>
<Header text="Quiz Game" />

{questionNumber >= results.length ? <Score score={points} totalQuestions={results.length} restartFunction={reloadWindow} /> : <div>
<h3>Points: {points}</h3>
<Quiz question={question} answers={answers} onAnswerSelected={handleAnswer} /></div>}
<footer>&copy; 2022 Quiz Quickie <br></br>by Dalton Leth</footer>
  </div>);
}

export default App;