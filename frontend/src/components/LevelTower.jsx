import React from 'react';

const LevelTower = React.memo(function LevelTower({ level }) {
  const totalBars = 5;
  const barHeights = [6, 12, 18, 24, 30];
  return (
    <div className="tower">
      {Array.from({ length: totalBars }).map((_, i) => (
        <div
          key={i}
          className={`bar ${i < level ? 'active' : ''}`}
          style={{ height: `${barHeights[i]}px` }}
        />
      ))}
    </div>
  );
});

export default LevelTower;