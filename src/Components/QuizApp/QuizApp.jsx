import './QuizApp.css';
import 'boxicons';
import Buttons from '../Buttons/Buttons';
import { useRef, useState } from 'react';
import { Data } from '../../assets/Data';



const QuizApp = () => {
  
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(Data[index]);
  let [lock, setLock] = useState(false);
  let [feedback, setFeedback] = useState('');
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let progressBar = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];
  const checkAns = (e) => {

    if (lock === false) {
      if (question.correct_answer === e.target.textContent) {
        e.target.classList.add("Correct");
        setLock(true);
        setFeedback("Correct!");
      }
      else {
        e.target.classList.add("Wrong");
        setLock(true);
        setFeedback("Wrong!");
        option_array[question.correct_answer].Current.classList.add("Correct!");
      }
    }
  }

  const next = () => {
    console.log("'hello");

    if (lock === true) {
      if (index === Data.length - 1) {
        return 0;
      }
      setIndex(++index);
      setQuestion(Data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("Correct");
        option.current.classList.remove("Wrong");
        return null
      })
    }  
  }


  return (
    <div className="container">
      <div className='questions_Numbers'>
        <h1 className='quizHeading'>Questin {index + 1} of {Data.length}</h1>
        <p>Entertainmnet: Board Games</p>
        <span className='difficulty'>
          <box-icon name='star' type='logo' className="dificulty" ></box-icon>
          <box-icon name='star' type='logo' className="dificulty" ></box-icon>
          <box-icon name='star' type='logo' className="dificulty" ></box-icon>
          <box-icon name='star' type='logo' className="dificulty" ></box-icon>
          <box-icon name='star' type='logo' className="dificulty"></box-icon>
        </span>
      </div>
      <div className='questions'>
        <p>{question.question}</p>
      </div>
      <div className='options_button'>
        <ul>
          <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.incorrect_answers[0]}</li>
          <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.incorrect_answers[1]}</li>
          <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.incorrect_answers[2]}</li>
          <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.correct_answer}</li>
        </ul>
      </div>
      <div className='submit_container'>
        <h2 className='Wrong_Correct'>{feedback}</h2>
        <button onClick={next}>Next Question</button>
      </div>
      <div className='score_container'>
        <div className='score'>
          <span className='gain_score'>Score: 0%</span>
          <span className='max_scores'>Max Score: 75%</span>
        </div>
        <div className='score_bar'>
          <span className='progress' ref={progressBar}></span>
        </div>
      </div>
    </div>
  );
};
export default QuizApp;