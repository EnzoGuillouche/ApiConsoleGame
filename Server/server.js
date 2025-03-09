import express from "express";
import readline from "readline";

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

    // Check if message starts with "attack/player"
    const match = receivedData.message.match(/^attack\/player(\d+)$/);
    
    if (match) {
        const playerIndex = parseInt(match[1], 10) - 1;
        
        if (playerIndex >= 0 && playerIndex < players.length) {
            players[playerIndex].reduceHealth(5);
            console.log(`\n${players[playerIndex].name} has been attacked! Current state:`, players[playerIndex].playerData());
            
            res.json({ success: true, playerData: players[playerIndex].playerData() });
        } else {
            res.status(400).json({ error: "Invalid player ID" });
        }
    } else {
        res.status(400).json({ error: "Invalid message format" });
    }
});

app.get("/data/connect", (req, res) => {
    let player = new Player(`Player ${players.length + 1}`, 100);
    players.push(player);
    console.log(`New player connected: ${player.name}`);
    
    res.json({ id: players.length, playerData: player.playerData() });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Handle spacebar to shut down the server
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
    if (key.name === "space") {
        console.log("\nShutting down server...");
        server.close(() => {
            process.exit(0);
        });
    }
});