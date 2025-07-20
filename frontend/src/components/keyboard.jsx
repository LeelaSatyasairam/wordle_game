export default function Keyboard({ onKeyPress, block }) {
  const KEYS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER','Z','X','C','V','B','N','M','DELETE']
  ];

  return (
    <div className="keyboard">
      {KEYS.map((row, i) => (
        <div className="key-row" key={i}>
          {row.map((key, j) => {
            const isBlocked = block.includes(key.toLowerCase());
            return (
              <button
                key={j}
                onClick={() => onKeyPress(key)}
                disabled={isBlocked}
                style={{ cursor: isBlocked ? 'not-allowed' : 'pointer' }}
                className="key"
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
