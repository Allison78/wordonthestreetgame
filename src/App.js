import './App.css';
import {useState, useEffect} from 'react';

const letters = ['B', 'C', 'D', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'Y'];
const questions = ['Musical Instrument', 'High School Course', 'Cereal', 'Bird', 'Coding Language', 'Sports Team Name', 'Country', 'University/College Name', 'Style of Music', 'Occupation', 'Mammal', 'Colour', 'Movie Title', 'Beverage', 'Vegetable'];
const timerLength = 60;
function App() {
  const [letterState, setLetterState] = useState(letters.map((letter) => ({letter, position: 0})));
  const [currentTeam, setCurrentTeam] = useState(1);
  const [currentQueestion, setCurrentQuestion] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [counter, setCounter] = useState(timerLength);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // count how many position  3 or -3 in letterState
    const team1Wins = letterState.filter(({position}) => position === 3).length === 8;
    const team2Wins = letterState.filter(({position}) => position === -3).length === 8;
    if (team1Wins) {
      setWinner('Team 1 Wins');
      resetTimer();
    } else if (team2Wins) {
      setWinner('Team 2 Wins');
      resetTimer();
    }
  }, [letterState]);

  useEffect(() => {
    const timer =
      startTimer && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setTimeout(() => {
        resetTimer()
      }, 2000);

    }
    if ((!startTimer && counter < timerLength)) {
      resetTimer()
    }
    return () => clearTimeout(timer);
  }, [counter, startTimer]);

  function resetTimer() {
    setStartTimer(false);
      setCounter(timerLength);
  }

  function resetGame() {
    setLetterState(letters.map((letter) => ({letter, position: 0})));
    setCurrentTeam(1);
    setCurrentQuestion(currentQueestion + 1);
    setStartTimer(false);
    setCounter(timerLength);
    setWinner(null);
  }

  function createLetterState(index, team) {
    if (letterState[index].position === 3 || letterState[index].position === -3) {
      return;
    }

    const newState = [...letterState];
    newState[index].position = team === 1 ? newState[index].position + 1 :newState[index].position - 1;
    setLetterState(newState);
  }

  function switchTeams(team) {
    setCurrentTeam(team);
    setCurrentQuestion(currentQueestion + 1);
  }

  return (
    <div className="App">
      <div className="Header">
      <div className="Teams">
        <div className={`${currentTeam === 1 ? 'Playing' : 'NotPlaying'}`} onClick={() => switchTeams(1)}>Team 1</div>
        <div  className={`${currentTeam === 2 ? 'Playing' : 'NotPlaying'}`} onClick={() => switchTeams(2)}>Team 2</div>
      </div>
      <div className="TimerBox">
        <div disabled={counter < timerLength}className={`TimerButton ${counter < timerLength ? 'Reset' : undefined}`} onClick={() => setStartTimer(timer => !timer)}>{counter === timerLength ? 'Start' : 'Reset'}</div>
        <div className="Timer">{counter}</div>
      </div>
      <div>
        <div className="ResetButton" onClick={resetGame}>Reset Game</div>
      </div>
    </div>

      <div className="Board">
      {letterState.map(({letter, position}, index) => (
        <div className="Column">
        <div key={`${letter}-1-WIN`} className={`Square Win ${position === 3 ? 'Visible' : 'Transparent'}`}>{letter}</div>
        <div key={`${letter}-1-2`} className={`Square Row2 ${position === 2 ? 'Visible' : 'Transparent'}`}>{letter}</div>
        <div key={`${letter}-1-1`} className={`Square Row1 ${position === 1 ? 'Visible' : 'Transparent'}`}>{letter}</div>
        <div key={letter} className={`Square Letter ${position === 0 ? 'Visible' : 'Transparent'}`}>
          {letter}
          <button className="Button" onClick={() => createLetterState(index, currentTeam)}>{currentTeam === 1 ? '^' : 'v'} </button>
        </div>
        <div key={`${letter}-2-1`}className={`Square Row1 ${position === -1 ? 'Visible' : 'Transparent'}`}>{letter}</div>
        <div key={`${letter}-2-2`}className={`Square Row2 ${position === -2 ? 'Visible' : 'Transparent'}`}>{letter}</div>
        <div key={`${letter}-2-WIN`} className={`Square Win ${position === -3 ? 'Visible' : 'Transparent'}`}>{letter}</div>
        </div>))}
      </div>
      <div className="Question">
        {startTimer && !winner ? questions[currentQueestion] : null}
        {winner ? winner : null}
      </div>
    </div>
  );
}

export default App;
