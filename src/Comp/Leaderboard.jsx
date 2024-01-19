import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ol>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.student}: {entry.score}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;