import axios from "axios";

const apiUrl = "http://localhost:6969";

// Function to send a GET request
async function getData() {
    try {
        const response = await axios.get(`${apiUrl}/data/player1`);
        console.log("Player 1 state:", response.data);
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

sendData("attack").then(() => getData());