import React from "react";
import "../App.css";

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <table>
        <thead>
          <tr style={{
            fontWeight:"900",
            fontSize:"1.1rem",
            

          }}>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.student}</td>
              <td>{player.score}</td>

            </tr>
          ))}

          

        </tbody>
      </table>
      
    </div>
  );
};

export default Leaderboard;
