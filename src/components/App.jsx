import React, {useState} from "react";
import Header from "./Header";
import Quiz from "./Quiz";
import Score from "./Score";
import axios from "axios";
import Choose from "./Choose";


const client = axios.create({
  baseURL: "https://the-trivia-api.com/api/questions"
});



function App() {
  //open triva database url
  let apiURL = "https://the-trivia-api.com/api/questions";
  //initialize results variable
  let results;
  
  //create stateful questionNumber
  const [questionNumber, nextQuestion] = useState(0);
  //create stateful points
  const [points, addPoints] = useState(0);
  //create stateful object to hold response from api
  const [post, setPost] = useState(null);
  //state to set background color of appArea when wrong answer is chosen
  const [appAreaStyle, setStyle] = useState({
    backgroundColor: "",
  });
  const [firstLoad, setFirstLoad] = useState(true);
  
  //create stateful counter for number of questions
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  function handlePlayButton() {
    apiURL = apiURL + "?limit=" + numberOfQuestions;
    setFirstLoad(false);
    client.get(apiURL).then((response) => {
      setPost(response.data);
    });

    //use Axios to retrieve api information
  }
  React.useEffect(() => {
    axios.get(apiURL).then((response) => {
      setPost(response.data);
    });
  }, [apiURL]);

  function handleAnswer(answer) {
    // console.log(answer);
    //compare to correct answer
    if(answer === correctAnswer) {
      // console.log("Correct");
      addPoints(points + 1);
    } else {
      // console.log("incorrect!");
      //flash red background for wrong choice
      setStyle({
        backgroundColor: "#D57864",
      });
      //wait 150ms before changing back
      setTimeout( () => {
        setStyle({
        backgroundColor: "",
      });
    }, 150);
    }
    //change question number state
    nextQuestion(questionNumber + 1);
  }

  //reload function for play again
  function reloadWindow() {
    window.location.reload();
  }

  function handleNumberOfQuestions(operator) {
    if (operator === "-") {
      setNumberOfQuestions(numberOfQuestions - 1);
    }
    if (operator === "+") {
      setNumberOfQuestions(numberOfQuestions + 1);
    }
  }

  
  
  if (!post) return null;
  
  

  
  
  // console.log(post);
  // console.log(post.results);
  //set results equal to api return
  results = post;
  // console.log(post);
  // console.log(results);
  // console.log(results.length);

  //get question object relative to current question number
  if (questionNumber < results.length) {

    var questionObject = results[questionNumber];
    
    var question = questionObject.question;
    var correctAnswer = questionObject.correctAnswer;
    var answers = questionObject.incorrectAnswers;
    //check to make sure there are no duplicates
    if (!answers.includes(correctAnswer)) {
      
      answers.push(questionObject.correctAnswer);
    }
    // console.log(answers);
    //perform functions to randomize answer order
    answers = answers.filter(n => n);
    answers.sort(() => Math.random() - 0.5);
  }
  // const question = 'What is the capital of France?';
  // const answers = ['Paris', 'London', 'Rome', 'Madrid'];


  return (<div className="container-fluid appArea" style={appAreaStyle}>
<Header text="Quiz Game" />

{firstLoad ? <Choose numberOfQuestions={numberOfQuestions} handlePlay={handlePlayButton} handleNumber={handleNumberOfQuestions} /> : null}
{((questionNumber >= results.length) && !firstLoad) ? <Score score={points} totalQuestions={results.length} restartFunction={reloadWindow} /> : null}
{((questionNumber < results.length) && !firstLoad) ? <div>
<h3>Points: {points}</h3>
<Quiz question={question} answers={answers} onAnswerSelected={handleAnswer} /></div> : null}
<footer>&copy; 2022 Quiz Quickie <br></br>by Dalton Leth</footer>
  </div>);
}

export default App;