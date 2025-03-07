import express from "express";

const app = express();
const PORT = 6969;

class Player {
    constructor(name, health) {
        this.name = name;
        this.health = health;
    }
    
    reduceHealth(damage){
        this.health -= damage;
    }

    playerData() {
        return { name: this.name, health: this.health };
    }
}

let player1 = new Player("skibidi", 100);

console.clear();

app.use(express.json()); 

app.post("/echo", (req, res) => {
    const receivedData = req.body;
    if (receivedData.message === "attack") {
        player1.reduceHealth(5);
        console.log(`${player1.name} has been attacked! Current state:`, player1.playerData());
    }

    res.json({ received: receivedData });
});

app.get("/data/player1", (req, res) => {
    res.json(player1.playerData());
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Initial state of the player:`, player1.playerData());
});
