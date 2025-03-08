import express from "express";
import fs from "fs";

const app = express();
const PORT = 6969;

console.clear();

class Player {
    constructor(name, health) {
        this.name = name;
        this.health = health;
    }
    
    reduceHealth(damage) {
        this.health -= damage;
    }

    playerData() {
        return { name: this.name, health: this.health };
    }
}

let players = [];

// Wait until players are set up before starting the server

app.use(express.json());

app.post("/echo/", (req, res) => {
    const receivedData = req.body;
    if (receivedData.message === "attack") {
        players.forEach((player) => {
            player.reduceHealth(5);
            console.log(`\n${player.name} has been attacked! Current state:`, player.playerData());
        });
    }

    res.json({ received: receivedData });
});

app.get("/data/connect", (req, res) => {
    let player = new Player(`Player ${players.length + 1}`, 100);
    players.push(player);
    console.log(`New player connected: ${player.name}`);
    
    res.json({ id: players.length, playerData: player.playerData() });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
