import React from "react";

function Score(props) {
  return (<div>
    <h2>Correct: {props.score}</h2>
    <h2>Total Questions: {props.totalQuestions}</h2>
    <button onClick={props.restartFunction}>Play Again?</button>
  </div>);
}

export default Score;