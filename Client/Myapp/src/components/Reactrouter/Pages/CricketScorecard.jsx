import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Card } from "react-bootstrap";



export default function CricketScorecard() {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [maxOvers, setMaxOvers] = useState(5);
  const [isStarted, setIsStarted] = useState(false); // To check if match has started
  const [overInput, setOverInput] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [battingTeam, setBattingTeam] = useState("");
  const [isSecondInnings, setIsSecondInnings] = useState(false);
  const [firstInningsScore, setFirstInningsScore] = useState(null);
  const [target, setTarget] = useState(null);



  // Batsman tracking
  const [batsmen, setBatsmen] = useState([
    { name: "", runs: 0, balls: 0 },
    { name: "", runs: 0, balls: 0 }
  ]);
  const [onStrike, setOnStrike] = useState(0);

  // Bowler tracking
  const [bowlers, setBowlers] = useState([
    { name: "", overs: 0, runsGiven: 0, wickets: 0 },
    { name: "", overs: 0, runsGiven: 0, wickets: 0 }
  ]);
  const [currentBowler, setCurrentBowler] = useState(0);

  // Temporary state for name inputs
  const [batsmanInputs, setBatsmanInputs] = useState(["", ""]);
  const [bowlerInputs, setBowlerInputs] = useState(["", ""]);

  // Start match with entered names
  const startMatch = () => {
    const oversToPlay = parseInt(overInput, 10);
    if (isNaN(oversToPlay) || oversToPlay <= 0) {
      alert("Please enter a valid number of overs.");
      return;
    }

    setMaxOvers(oversToPlay);
    setBatsmen([
      { name: batsmanInputs[0], runs: 0, balls: 0 },
      { name: batsmanInputs[1], runs: 0, balls: 0 }
    ]);
    setBowlers([
      { name: bowlerInputs[0], overs: 0, runsGiven: 0, wickets: 0 },
      { name: bowlerInputs[1], overs: 0, runsGiven: 0, wickets: 0 }
    ]);
    if (!team1 || !team2) {
      alert("Please enter both team names.");
      return;
    }
    if (!tossWinner) {
      alert("Please select the toss winner.");
      return;
    }
    if (!battingTeam) {
      alert("Please select the batting team.");
      return;
    }
    setMaxOvers(oversToPlay);
    setIsStarted(true);
  };

  // Handle Runs
  const handleRun = (value) => {
    if (balls >= maxOvers * 6) {
      alert("Innings Over! No more deliveries allowed.");

      if (isSecondInnings) {
        declareWinner();
      }
      return;
    }

    setRuns(runs + value);
    setBalls(balls + 1);

    let newBatsmen = [...batsmen];
    newBatsmen[onStrike].runs += value;
    newBatsmen[onStrike].balls += 1;
    setBatsmen(newBatsmen);

    let newBowlers = [...bowlers];
    newBowlers[currentBowler].runsGiven += value;
    setBowlers(newBowlers);

    if (value % 2 !== 0) {
      setOnStrike(onStrike === 0 ? 1 : 0);
    }

    if ((balls + 1) % 6 === 0) {
      setOnStrike(onStrike === 0 ? 1 : 0);
      changeBowler();
    }

    if (isSecondInnings && runs + value >= target) {
      setRuns(runs + value);
      alert(`${battingTeam} wins!`);
      resetScore();
      return;
    }
  };
  const handleDotBall = () => {
    if (balls >= maxOvers * 6) {
      alert("Innings Over! No more deliveries allowed.");
      if (isSecondInnings) {
        declareWinner();
      }
      return;
    }

    setBalls(balls + 1);

    let newBatsmen = [...batsmen];
    newBatsmen[onStrike].balls += 1;
    setBatsmen(newBatsmen);

    // Check if the over is completed
    if ((balls + 1) % 6 === 0) {
      changeBowler();
    }
  };
  const handleNoBall = (value) => {
    setRuns(runs + value + 1); // Add 1 extra run for no-ball + runs scored
    let newBatsmen = [...batsmen];
    newBatsmen[onStrike].runs += value;
    setBatsmen(newBatsmen);

    let newBowlers = [...bowlers];
    newBowlers[currentBowler].runsGiven += value + 1;
    setBowlers(newBowlers);
  };
  const handleWideBall = (value) => {
    setRuns(runs + value + 1); // 1 run for wide + any additional runs
    let newBowlers = [...bowlers];
    newBowlers[currentBowler].runsGiven += value + 1;
    setBowlers(newBowlers);
  };

  // Handle Wicket
  const handleWicket = () => {
    if (balls >= maxOvers * 6) {
      alert("Innings Over! No more deliveries allowed.");
      if (isSecondInnings) {
        declareWinner();
      }
      return;
    }
  
    if (wickets < 10) {
      const newBatsmanName = prompt("Enter new batsman's name:");
      if (!newBatsmanName) return;
  
      setWickets(wickets + 1);
      setBalls(balls + 1); // Increment ball count for the wicket delivery
  
      let newBatsmen = [...batsmen];
      newBatsmen[onStrike] = { name: newBatsmanName, runs: 0, balls: 0 };
      setBatsmen(newBatsmen);
  
      let newBowlers = [...bowlers];
      newBowlers[currentBowler].wickets += 1;
      setBowlers(newBowlers);
  
      // Check if the over is completed
      if ((balls + 1) % 6 === 0) {
        changeBowler();
      }
    }
  
    // Check if second innings ends due to all out
    if (isSecondInnings && wickets + 1 === 10) {
      setWickets(wickets + 1);
      declareWinner();
      return;
    }
  };
  const declareWinner = () => {
    if (runs >= target) {
      alert(`${battingTeam} wins!`);
    } else {
      const bowlingTeam = battingTeam === team1 ? team2 : team1;
      alert(`${bowlingTeam} wins!`);
    }
    resetScore();
  };

  // Change Bowler
  const changeBowler = () => {
    let newBowlerName = prompt("Enter next bowler's name:");
    if (!newBowlerName) return; // If user cancels or enters nothing, do nothing

    let newBowlers = [...bowlers];
    newBowlers[currentBowler].overs += 1;

    // Rotate to a new bowler
    setCurrentBowler((currentBowler + 1) % bowlers.length);

    // Add the new bowler to the list
    newBowlers[(currentBowler + 1) % bowlers.length] = {
      name: newBowlerName,
      overs: 0,
      runsGiven: 0,
      wickets: 0,
    };

    setBowlers(newBowlers);
  };
  const startSecondInnings = () => {
    if (!isSecondInnings) {
      setFirstInningsScore({ runs, wickets, overs: Math.floor(balls / 6) + "." + (balls % 6) });
      setTarget(runs + 1); // Setting target (one more than first innings score)

      const newBatsman1 = prompt("Enter first batsman's name for second innings:");
      const newBatsman2 = prompt("Enter second batsman's name for second innings:");
      const newBowler = prompt("Enter first bowler's name for second innings:");

      setRuns(0);
      setWickets(0);
      setBalls(0);
      setBatsmen([
        { name: newBatsman1 || "", runs: 0, balls: 0 },
        { name: newBatsman2 || "", runs: 0, balls: 0 }
      ]);
      setOnStrike(0);
      setBowlers([
        { name: newBowler || "", overs: 0, runsGiven: 0, wickets: 0 }
      ]);
      setCurrentBowler(0);
      setIsSecondInnings(true);

      // Swap batting and bowling teams
      setBattingTeam(battingTeam === team1 ? team2 : team1);
    }
  };
  // Reset Score
  const resetScore = () => {
    setRuns(0);
    setWickets(0);
    setBalls(0);
    setBatsmen([{ name: "", runs: 0, balls: 0 }, { name: "", runs: 0, balls: 0 }]);
    setOnStrike(0);
    setBowlers([{ name: "", overs: 0, runsGiven: 0, wickets: 0 }, { name: "", overs: 0, runsGiven: 0, wickets: 0 }]);
    setCurrentBowler(0);
    setIsStarted(false);
  };
  const saveMatch = async () => {
    const matchData = {
      team1,
      team2,
      tossWinner,
      battingTeam,
      runs,
      wickets,
      overs,
      target,
      batsmen,
      bowlers,
    };

    try {
      console.log(matchData);

      // const [team1, setTeam1] = useState("");
      // const [team2, setTeam2] = useState("");
      // const [tossWinner, setTossWinner] = useState("");
      // const [battingTeam, setBattingTeam] = useState("");
      // const [isSecondInnings, setIsSecondInnings] = useState(false);
      // const [firstInningsScore, setFirstInningsScore] = useState(null);
      // const [target, setTarget] = useState(null);

      const response = await fetch("http://localhost:3001/saveMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         },
        body: JSON.stringify(matchData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Failed to save match data");
    }
  };

  const overs = Math.floor(balls / 6) + "." + (balls % 6);

  return (
    <div style={{width:'600px',height:'600px',borderRadius:'25px'}}>
      <Card className="p-5 max-w-md mx-auto text-center shadow-lg" style={{ backgroundColor: "lightgray", justifyContent: "center",borderRadius:'25px' }}>
        {!isStarted ? (
          <div>
            <h2 style={{textAlign:'center'}}>Enter Player Names</h2>
            <Form.Group style={{marginLeft:'10px',color:"blue"}}>
              <Form.Label>Batsman 1</Form.Label>
              <Form.Control type="text" style={{ marginLeft: '10px' }} value={batsmanInputs[0]} onChange={(e) => setBatsmanInputs([e.target.value, batsmanInputs[1]])} /><br></br><br></br>
              <Form.Label>Batsman 2</Form.Label>
              <Form.Control type="text" style={{ marginLeft: '10px' }} value={batsmanInputs[1]} onChange={(e) => setBatsmanInputs([batsmanInputs[0], e.target.value])} /><br></br><br></br>
              <Form.Label>Bowler</Form.Label>
              <Form.Control type="text" style={{ marginLeft: '10px' }} value={bowlerInputs[1]} onChange={(e) => setBowlerInputs([bowlerInputs[0], e.target.value])} /><br></br><br></br>
              <Form.Label>Number of Overs</Form.Label>
              <Form.Control type="number" style={{ marginLeft: '10px' }} value={overInput} onChange={(e) => setOverInput(e.target.value)} /><br></br><br></br>
            </Form.Group>
            <Form.Group style={{marginLeft:'10px',color:"blue"}}>
              <Form.Label>Team 1</Form.Label>
              <Form.Control type="text" value={team1} onChange={(e) => setTeam1(e.target.value)} /><br></br><br></br>

              <Form.Label>Team 2</Form.Label>
              <Form.Control type="text" value={team2} onChange={(e) => setTeam2(e.target.value)} /><br></br><br></br>

              <Form.Label>Who won the toss?</Form.Label>
              <Form.Select value={tossWinner} onChange={(e) => setTossWinner(e.target.value)}><br></br><br></br>
                <option value="">Select</option>
                <option value={team1}>{team1}</option>
                <option value={team2}>{team2}</option>
              </Form.Select>

              {tossWinner && (
                <>
                  <Form.Label>What did {tossWinner} choose?</Form.Label>
                  <Form.Select value={battingTeam} onChange={(e) => setBattingTeam(e.target.value)}>
                    <option value="">Select</option>
                    <option value={tossWinner}>Batting</option>
                    <option value={tossWinner === team1 ? team2 : team1}>Bowling</option>
                  </Form.Select>
                </>
              )}
            </Form.Group>
            <br></br>
            <Button onClick={startMatch} className="mt-2" style={{ backgroundColor: "Green" }}>Start Match</Button>
          </div>
        ) : (
          <Card style={{margin:'0px',backgroundColor:'lightgray'}}>
            <h1 className="text-2xl font-bold mb-3" style={{textAlign:'center'}}>Live Cricket Score</h1>
            <p className="text-lg" style={{ color: "blue" }}>Runs: {runs}-{wickets}</p>
            <p className="text-lg" style={{ color: "blue" }}>Overs: {overs}</p>
            <p className="text-lg">{batsmen[0].name}: {batsmen[0].runs} ({batsmen[0].balls})</p>
            <p className="text-lg">{batsmen[1].name}: {batsmen[1].runs} ({batsmen[1].balls})</p>
            <p className="text-lg">On Strike: {batsmen[onStrike].name}</p>
            <p className="text-lg">Bowler: {bowlers[currentBowler].name} ({bowlers[currentBowler].overs} ov, {bowlers[currentBowler].runsGiven} runs, {bowlers[currentBowler].wickets} wkts)</p>
            <h2>{team1} vs {team2}</h2>
            <p><strong>{tossWinner}</strong> won the toss and chose to {battingTeam === tossWinner ? "bat" : "bowl"} first.</p>
            <p>Batting Team: <strong>{battingTeam}</strong></p>
            {isSecondInnings && (
              <p className="text-lg" style={{ color: "red" }}>
                Target: {target} | {battingTeam} chasing {firstInningsScore.runs}
              </p>
            )}
            <div className="grid grid-cols-3 gap-2 mt-4" style={{marginLeft:'10px',}}>
              {[1, 2, 3, 4, 5, 6].map((run) => (
                <Button style={{marginLeft:'10px'}} key={run} onClick={() => handleRun(run)}>{run}</Button>
              ))}
            </div>
            <Button onClick={handleWicket} className="mt-2" style={{ backgroundColor: "lightgreen", marginLeft: '15px', marginTop: '15px' }}>Wicket</Button>
            <Button onClick={resetScore} className="mt-2 bg-red-500" style={{ backgroundColor: "lightgreen", marginLeft: '15px' }}>Reset</Button>
            <Button onClick={startSecondInnings} className="mt-2 bg-red-500" style={{ backgroundColor: "lightgreen", marginLeft: '15px' }}>
              Start Second Innings
            </Button><br/><br/>
            <Button onClick={handleDotBall} className="mt-2" style={{ backgroundColor: "gray", marginLeft: '15px' }}>
              Dot Ball
            </Button>
            <Button onClick={() => handleNoBall(0)} className="mt-2" style={{ backgroundColor: "orange", marginLeft: '15px' }}>
              No Ball
            </Button>
            <Button onClick={() => handleWideBall(0)} className="mt-2" style={{ backgroundColor: "purple", marginLeft: '15px' }}>
              Wide Ball
            </Button><br></br><br></br>
            <Button onClick={saveMatch} className="mt-2" style={{backgroundColor:'green',marginLeft: '15px'}}>
              Save
            </Button>
          </Card>
        )}
      </Card>
    </div>
  );
}