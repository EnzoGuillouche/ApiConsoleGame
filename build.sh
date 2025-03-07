clear

DEPENDENCIES=("express" "axios")

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

osascript -e "tell application \"Terminal\" to do script \"cd '$SCRIPT_DIR/Server' && node --trace-warnings server.js; exec bash\""
osascript -e "tell application \"Terminal\" to do script \"cd '$SCRIPT_DIR/Client' && node --trace-warnings client.js; exec bash\""