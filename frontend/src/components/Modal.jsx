import { useRef } from "react";
import axios from 'axios';

export default function Modal({ isCorrect, solution, totalScore, scoreid, onNextLevel ,level}) {
  const API = import.meta.env.VITE_API_URL;
  const updatedRef = useRef(false); // Prevent double submission

  const handlePlayAgain = async () => {
    if (!isCorrect || !scoreid || updatedRef.current) {
      window.location.reload(); // Safe fallback
      return;
    }

    updatedRef.current = true;

    const updatedTotalScore = (totalScore || 0);

    const payload={
      scoreid:scoreid,
      totalscore:updatedTotalScore,
    }

    try {
      await axios.put(`${API}/score`, payload);
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          await axios.post(`${API}/score`, payload);
        } catch (postErr) {
          console.error('POST failed:', postErr);
        }
      } else {
        console.error('PUT failed:', err);
      }
    }
    if (isCorrect && onNextLevel && level!==5){
       onNextLevel();
    }else{
       window.location.reload(); // Safe fallback
      
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {isCorrect ? (
          <h2>🎉 You guessed it right! <strong>{solution.toUpperCase()}</strong></h2>
          
        ) : (
          <h2>❌ Game Over! The word was <strong>{solution.toUpperCase()}</strong></h2>
        )}
        <button onClick={handlePlayAgain}>{isCorrect ? "Play next level": "play again"}</button>
      </div>
    </div>
  );
}
