import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/keyboard';
import Modal from './components/Modal';
import {
  getRandom1,
  getRandom2,
  getRandom3,
  getRandom4,
  getRandom5
} from './utils/wordList';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Wordle() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [note, setNote] = useState(false);
  const [keyStatuses, setKeyStatuses] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [level, setLevel] = useState(1)

  // const[stage,setStage]=useState(0);

  const navigate = useNavigate();
  const scoreid = localStorage.getItem('personid');
  const API = import.meta.env.VITE_API_URL;

// Create a function map
const wordGetters = {
  1: getRandom1,
  2: getRandom2,
  3: getRandom3,
  4: getRandom4,
  5: getRandom5
};

// In useEffect
useEffect(() => {
  const getter = wordGetters[level];
  if (getter) {
    setSolution(getter());
  } else {
    console.error(`Invalid level: ${level}`);
  }
}, [level]);

  useEffect(() => {
    if (note) {
      const timer = setTimeout(() => setNote(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [note]);


  function handleKeyPress(letter) {
    if (isGameOver) return;

    if (letter === 'ENTER') {
      if (currentGuess.length !== level) return setNote(true);

      const updatedGuesses = [...guesses, currentGuess];
      setGuesses(updatedGuesses);
      setCurrentGuess('');

      setKeyStatuses((prev) => {
        const newStatuses = { ...prev };
        currentGuess.split('').forEach((letter, idx) => {
          const lowerLetter = letter.toLowerCase();
          const correct = solution[idx] === lowerLetter;
          const present = solution.includes(lowerLetter);

          if (correct) {
            newStatuses[lowerLetter] = 'correct';
          } else if (present && newStatuses[lowerLetter] !== 'correct') {
            newStatuses[lowerLetter] = 'present';
          } else if (!present && !newStatuses[lowerLetter]) {
            newStatuses[lowerLetter] = 'absent';
          }
        });
        return newStatuses;
      });

      if (currentGuess === solution) {
        setIsCorrect(true);
        setIsGameOver(true);
        setTotalScore((prev) => prev + solution.length);

      } else if (updatedGuesses.length === 5) {
        setIsGameOver(true);
      }
    } else if (letter === 'DELETE') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  }


  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (key === 'ENTER') {
        handleKeyPress('ENTER');
      } else if (key === 'BACKSPACE') {
        handleKeyPress('DELETE');
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, isGameOver]);

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  function handleRestart() {
    window.location.reload()
  }

  // 🟢 Fetch previous score
  useEffect(() => {
    async function fetchScore() {
      try {
        const result = await axios.get(`${API}/score?scoreid=${scoreid}`);
        setTotalScore(result.data?.data?.totalscore || 0);
      } catch (error) {
        console.error('Error fetching score:', error.message);
        setTotalScore(0); 
      }
    }
    if (scoreid) {
      fetchScore();
    }
  }, []);


  return (
    <div
      className="app"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: 'fit-content',
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          position: 'relative',
        }}
      >
        {level!==5 ? <i
          className="fas fa-sign-out-alt"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            fontSize: '1.5rem',
            color: '#e53935',
            cursor: 'pointer',
          }}
          title="Logout"
          onClick={handleLogout}
        />:<i
          className="fa-solid fa-rotate"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            fontSize: '1.5rem',
            color: '#e53935',
            cursor: 'pointer',
          }}
          title="restart"
          onClick={handleRestart}
        />}
        <h1 style={{ color: '#1a73e8' }}>Wordle Game</h1>
        { level==1 ?<h4 style={{textAlign:'left',color:'gray'}}>🚩Hint try vowels</h4>:""}
        <GameBoard
          guesses={guesses}
          currentGuess={currentGuess}
          solution={solution}
          level={level}
        />
        <div style={{ marginTop: '2rem' }}>
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
        {isGameOver && <Modal isCorrect={isCorrect} solution={solution} scoreid={scoreid} totalScore={totalScore} level ={level}
          onNextLevel={() => {
            setLevel((prevLevel) => {
              const nextLevel = Math.min(prevLevel + 1, 5);
              return nextLevel;
            });
            setGuesses([]);
            setCurrentGuess('');
            setIsCorrect(false);
            setIsGameOver(false);
            setKeyStatuses({});
          }}

        />}
        {note && (
          <div className="modal">
            <h2 className="modal-content">Word is too short 🔴</h2>
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '180px',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '1rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          fontSize: '0.9rem',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#444' }}>
          🧮{((localStorage.getItem('name')).split('@')[0]).toUpperCase()}
        </h3>
        <p><strong>Total score:</strong > {totalScore}</p>
        <p><strong>Level:</strong > {level}</p>
        {/* <p><strong>Stage:</strong> {stage > 0 ? `Stage ${stage}` : '-'}</p>
           <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {[1, 2, 3, 4, 5].map((s) => (
        <li key={s} style={{ marginBottom: '0.3rem' }}>
          Stage {s}: {stage === s && isCorrect ? '✅' : '❌'}
        </li>
      ))}
    </ul>  */}
      </div>
    </div>
  );
}

export default Wordle;


