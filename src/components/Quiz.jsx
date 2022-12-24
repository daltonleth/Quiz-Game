import React from "react";

function Quiz({question, answers, onAnswerSelected}) {
  return (<div>
<h3>{question}</h3>
{answers.map((answer, index) => (
  <button key={index} onClick={() => onAnswerSelected(answer)}>
    {answer}
  </button>
))}
  </div>);
}

export default Quiz;