clear

DEPENDENCIES=("express" "axios")
SETUPFILE="setup.dat"

echo "Checking for package.json..."

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "package.json not found! Creating one..."
    echo '{
  "type": "module",
  "dependencies": {}
}' > package.json
    echo "Created package.json\n"

    echo "Installing dependencies..."
    npm install "${DEPENDENCIES[@]}"
    echo "Installed dependencies: ${DEPENDENCIES[*]}\n"
else 
    echo "package.json found.\n"
fi

echo "Checking dependencies..."

# Check if node_modules exists or dependencies are missing
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install "${DEPENDENCIES[@]}"
    echo "Installed dependencies: ${DEPENDENCIES[*]}\n"
else
    echo "Dependencies installed.\n"
fi

echo "Opening windows..."

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Get the number of players from setup.dat using awk
players=$(awk -F': ' '/players/ {print $2}' "$SETUPFILE")

# Open server terminal
osascript -e "tell application \"Terminal\" to do script \"cd '$SCRIPT_DIR/Server' && node --trace-warnings server.js; exec bash\""

# Open client terminals for each player
for ((i=1; i<=players; i++)); do
    osascript -e "tell application \"Terminal\" to do script \"cd '$SCRIPT_DIR/Client' && node --trace-warnings client.js; exec bash\""
done
