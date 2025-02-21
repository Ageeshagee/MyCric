import { useEffect, useState } from "react"; 
import { Card, Button } from "react-bootstrap";

export default function MatchHistory() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch("http://localhost:3001/matches");
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Failed to fetch matches", error);
    }
  };

  // Function to determine match winner
  const determineWinner = (match) => {
    if (match.runs >= match.target) {
      return match.battingTeam; // Batting team wins if they reached the target
    } else {
      return match.team1 === match.battingTeam ? match.team2 : match.team1; // Otherwise, the other team wins
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ color: "green" }}>Saved Matches</h2>
      {matches.length === 0 ? (
        <p>No matches saved yet.</p>
      ) : (
        matches.map((match, index) => (
          <Card key={index} className="mb-3 p-3" style={{ backgroundColor: "lightgreen" }}>
            <h4>{match.team1} vs {match.team2}</h4>
            <p><strong>Toss Winner:</strong> {match.tossWinner}</p>
            <p><strong>Batting Team:</strong> {match.battingTeam}</p>
            <p><strong>Final Score:</strong> {match.runs}-{match.wickets} ({match.overs} overs)</p>
            <p><strong>Target:</strong> {match.target}</p>
            <h5 style={{ color: "blue" }}><strong>Winner:</strong> {determineWinner(match)}</h5>
            <Button variant="danger" onClick={() => alert("Delete function not implemented yet!")}>Delete</Button>
          </Card>
        ))
      )}
    </div>
  );
}
