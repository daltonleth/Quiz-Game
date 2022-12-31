import React, {useState} from "react";


function Choose(props) {



  return (<div>
  <h3 className="question">How many questions?</h3>
    <h3 className="question chooseQuestion">{props.numberOfQuestions}</h3>
    <button className="chooseButton" onClick={(event) => props.handleNumber("-")}>-</button>
    <button className="chooseButton"onClick={(event) => props.handleNumber("+")}>+</button>
    <button className="playButton"onClick={props.handlePlay}>Play</button>
  </div>);
}

export default Choose;