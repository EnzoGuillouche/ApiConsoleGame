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

function setupPlayers(callback) {
    fs.readFile('../setup.dat', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        
        // Extract number of players
        const match = data.match(/players:\s*(\d+)/);
        if (match) {
            const numPlayers = parseInt(match[1], 10); // Get the number of players as an integer

            for (let i = 0; i < numPlayers; i++) {
                let player = new Player(`Player${i + 1}`, 100); 
                players.push(player);
            }

            console.log(`Created ${players.length} player(s).`);
            callback(); // Call the callback after players are set up
        } else {
            console.log('No player information found in setup.dat.');
        }
    });
}

// Wait until players are set up before starting the server
setupPlayers(() => {
    app.use(express.json());

    app.post("/echo", (req, res) => {
        const receivedData = req.body;
        if (receivedData.message === "attack") {
            players.forEach((player) => {
                player.reduceHealth(5);
                console.log(`\n${player.name} has been attacked! Current state:`, player.playerData());
            });
        }

        res.json({ received: receivedData });
    });

    app.get("/data/player1", (req, res) => {
        if (players.length > 0) {
            // Send data of the first player only
            res.json(players[0].playerData());
        } else {
            res.status(404).json({ error: "No players found." });
        }
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        players.forEach((player) => {
            console.log(`Initial state of the player:`, player.playerData());
        });
    });
});
