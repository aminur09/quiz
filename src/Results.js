import React from 'react';

function ShowResults({recordAnswers,questionList}) {

function calculatedAnswer () {

let tally = 0 
recordAnswers.forEach(i=>{
  const correctAnswer= questionList.find(j =>j.questionID == i[0]).correctAnswerID
  if(correctAnswer == i[1]){
    tally ++
  }
   console.log(correctAnswer,'correctAnswer');

})
console.log(tally,'tally');
if (tally === 0) {
  return 'You got no answers correct'
}
else if (tally === 1) {
  return `You got ${(tally/questionList.length)*100}% answer correct`
}
else if (tally === 2) {
  return `You got ${(tally/questionList.length)*100}% answers correct`
}
else if (tally === 3) {
  return `You got ${(tally/questionList.length)*100}% answers correct`
}
else if (tally === 4) {
  return `You got ${(tally/questionList.length)*100}% answers correct`
}
else {
return `Congratulations!!! You scored ${(tally/questionList.length)*100}%`
}
}

function restart () {
  window.location.reload()
}

    return (
    <div className="App">
      {calculatedAnswer()}
      <br />
      <button onClick={restart}>Restart Quiz</button>
    </div>
  );
}

export default ShowResults;
