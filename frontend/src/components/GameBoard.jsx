import Tile from './Tile';

function getTileStatus(letter, index, solution) {
  if (!letter || !solution) return '';
  if (solution[index] === letter) return 'correct';
  else if (solution.includes(letter)) return 'present';
  else return 'absent';
}

export default function GameBoard({ guesses, currentGuess, solution,level }) {
  const rows = [...guesses];
  const currentRowIndex = guesses.length;

  if (rows.length < 5) rows.push(currentGuess);
  while (rows.length < 5) rows.push('');

  return (
    <div className="board">
      {rows.map((word, i) => (
        <div className="row" key={i}>
          {Array.from({ length: level }).map((_, j) => (
            <Tile key={j} letter={word[j]} status={i <currentRowIndex ?getTileStatus(word[j], j, solution): ''} />
          ))}
        </div>
      ))}
    </div>
  );

}

