import './App.css';
import questionMenu from './api/multipleChoice.json';
import React , {useState} from 'react';
import Answer from './Answer/Answer';
import Results from './Results';



function App() {
const [currentQuestion, setCurrentQuestion] =useState(1)
const [recordAnswers, setRecordAnswers] =useState([])
const [questionList, setquestionList] = useState(questionMenu.options)
const [showResults, setShowResults] = useState(false)


console.log(recordAnswers,'recordAnswers');

const details=questionList.find(i=>i.questionID===currentQuestion)

function handleNext () {
  if(currentQuestion === questionList.length){
  return setShowResults(true)
  }
  setCurrentQuestion(currentQuestion + 1)
}

//user input validation alert
function clickNext () {
  if(recordAnswers.length === 0){
    alert('Please select an answer before proceeding to the next question') //if no answer is selected
  }
  else {
    handleNext()
}
}

let tally = 0 
recordAnswers.forEach(i=>{
  const correctAnswer= questionList.find(j =>j.questionID == i[0]).correctAnswerID
  if(correctAnswer == i[1]){
    tally ++
  }
   console.log(correctAnswer,'correctAnswer');

})

function handleRecordAnswer (chosenAnswerId) {
let copyCurrentAnswers = [...recordAnswers]
const doesEntryExist = copyCurrentAnswers.find(i=>i[0]==currentQuestion)
console.log(doesEntryExist,'doesEntryExist');
if(!doesEntryExist) {
  copyCurrentAnswers.push([currentQuestion,chosenAnswerId])
  return setRecordAnswers(copyCurrentAnswers) ;
  
}
let extractOtherValues = copyCurrentAnswers
.filter(j=>j[0] !==currentQuestion)
extractOtherValues.push([currentQuestion,chosenAnswerId])
console.log(extractOtherValues,'extractOtherValues');
setRecordAnswers(extractOtherValues)
}

function restart () {
  window.location.reload()
}

  return (
    <div className="App">
     <div className="header" > Welcome To American Quiz </div>
     {!showResults && 
     <div>
     <h3>Status : {`You Answered ${currentQuestion} out of ${questionList.length}`} <span> And Your Current Score {tally}</span></h3>
     <h3>Category : {details.question}</h3>
     <h4>{details.subQuestion}</h4>
      <Answer
      answers={details.answers}
      handleRecordAnswer={handleRecordAnswer}
      currentQuestion={currentQuestion}
      recordAnswers={recordAnswers}
      />
      <div className='app__button'>
      <button disabled={currentQuestion === 1} onClick={()=>setCurrentQuestion(currentQuestion-1)}>Previous</button>
      <button onClick={restart}>Restart Quiz</button>
      <button disable={currentQuestion === questionList.length} onClick={()=>clickNext()}>Next</button>

      </div>
      </div>
     }
      {showResults && <Results
      recordAnswers={recordAnswers}
      questionList={questionList}
      />}
    </div>
  );
}

export default App;
