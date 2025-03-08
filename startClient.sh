SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

clear

echo "Opening client window..."

osascript -e "tell application \"Terminal\" to do script \"cd '$SCRIPT_DIR/Client' && node --trace-warnings client.js; exec bash\"" 