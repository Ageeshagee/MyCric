const express=require('express');
require('dotenv').config();
const connectDb = require('./config/db')
const authroutes=require('./routes/authroutes')
const adminroute=require('./routes/adminroute')
const mongoose = require('mongoose');
const cros =require('cors');


connectDb()
const app=express()
app.use(cros());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Welcome")
})
app.use('/api/auth',authroutes)
app.use('/api/admin',adminroute)

const matchSchema = new mongoose.Schema({
    team1: String,
    team2: String,
    tossWinner: String,
    battingTeam: String,
    runs: Number,
    wickets: Number,
    overs: Number,
    target: Number,
    batsmen: [
      {
        name: String,
        runs: Number,
        balls: Number,
        fours: Number,
        sixes: Number,
        strikeRate: Number,
      },
    ],
    bowlers: [
      {
        name: String,
        overs: Number,
        runsConceded: Number,
        wickets: Number,
        economy: Number,
      },
    ],
  });
  
    
    const Match = mongoose.model("Match", matchSchema);
    
    // Route to save match data
    app.post("/saveMatch", async (req, res) => {
      try {
        const {
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
        } = req.body;
    
        // Create a new Match instance with the provided data
        const match = new Match({
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
        });
        console.log(match);
        await match.save();
        res.json({ message: "Match saved successfully" });
      } catch (error) {
        console.error("Error saving match:", error);
        res.status(500).json({ error: "Failed to save match" });
      }
    });
    // app.post("/saveMatch", async (req, res) => {
    //   try {
    //     const match = new Match(req.body);
    //     console.log(match);
    //     await match.save();
    //     res.json({ message: "Match saved successfully" });
    //   } catch (error) {
    //     res.status(500).json({ error: "Failed to save match" });
    //   }
    // });
    
    // Route to fetch all saved matches
    app.get("/matches", async (req, res) => {
      try {
        const matches = await Match.find();
        res.json(matches);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch matches" });
      }
    });

    const UserReg = mongoose.model("UserReg", {
      name: String,
      email: String,
      password: String,
    });
    
    // API: Create User
    app.post("/users", async (req, res) => {
      const user = new UserReg (req.body);
      await user.save();
      res.json({ message: "User created successfully!" });
    });
    
    // API: Get Users (For Admin Dashboard)
    app.get("/users", async (req, res) => {
      const users = await UserReg.find();
      res.json(users);
    });

const PORT=process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Hello Post is ready to http//localhost:${PORT}`)
}
)
