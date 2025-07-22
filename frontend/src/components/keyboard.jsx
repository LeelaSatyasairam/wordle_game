export default function Keyboard({ onKeyPress}) {
  const KEYS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['DELETE','Z','X','C','V','B','N','M','ENTER']
  ];

  return (
    <div className="keyboard">
      {KEYS.map((row, i) => (
        <div className="key-row" key={i}>
          {row.map((key, j) => {
            return (
              <button
                key={j}
                onClick={() => onKeyPress(key)}
                style={{ cursor: 'pointer' }}
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
