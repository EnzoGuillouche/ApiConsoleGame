import axios from "axios";
import readline from "readline";

const apiUrl = "http://localhost:6969";

let playerId;

// Function to send a GET request
async function getData(request) {
    try {
        const response = await axios.get(`${apiUrl}/data/${request}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// Function to send a POST request
async function sendData(request) {
    try {
        const payload = { message: request };
        const response = await axios.post(`${apiUrl}/echo`, payload);
        console.log("Sent:", request);
    } catch (error) {
        console.error("Error sending data:", error.message);
    }
}

console.clear();

// Create readline interface to get user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function menu() {
    rl.question("Press 'space' to attack or 'q' to quit: ", (input) => {
        if (input === " ") {
            sendData("attack").then(() => getData()).then(() => {
                menu();
            });
        } else if (input === "q") {
            console.log("Exiting...");
            rl.close();
        } else {
            console.log("Invalid input. Please press 'space' to attack or 'q' to quit.");
            menu();
        }
    });
}

async function setup() {
    const setupResponse = await getData("connect");

    if (setupResponse) {
        playerId = setupResponse.id;
        console.log(`Connected as ${setupResponse.playerData.name} (ID: ${playerId})`);
    } else {
        console.log("Failed to connect.");
    }
}

async function main() {
    await setup();
    menu();
}

main();