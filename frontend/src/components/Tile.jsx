import { useEffect, useState } from 'react';

export default function Tile({ letter = '', status = '' }) {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (letter) {
      setPop(true);
      const timeout = setTimeout(() => setPop(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [letter]);

  return (
    <div className={`tile ${status} ${pop ? 'pop' : ''}`}>
      {letter.toUpperCase()}
    </div>
  );
}
