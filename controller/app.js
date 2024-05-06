const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const { readFile, readFileSync } = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
    let file = readFileSync('../chapter-1/index.html', 'utf8');
    file = file.replace('</body>', `
    <script>
    let ws = null;
    function connectWebSocket() {
        ws = new WebSocket('wss://' + window.location.host);
        ws.addEventListener('close', function () {
            // Reconnect after a delay
            setTimeout(connectWebSocket, 2000);
        });
        ws.onmessage = function(event) {
            console.log('Command received:', event.data);
            if(event.data == 'next') {
                document.querySelector('button[data-bespoke-marp-osc="next"]').click()
            } else if(event.data == 'prev') {
                document.querySelector('button[data-bespoke-marp-osc="prev"]').click()
            }  else if(event.data == 'fullscreen') {
                document.querySelector('button[data-bespoke-marp-osc="fullscreen"]').click()
            }  else if(/goto/.test(event.data)) {
                const [_, page] = /goto(\\d+)/.exec(event.data);
                document.location.hash = page;
            }
        };
    }
    document.addEventListener('DOMContentLoaded', function() {
       connectWebSocket();
    });
    </script>
    </body>
    `);
    res.setHeader('Content-Type', 'text/html');
    res.send(file);
});

app.use(express.static('../chapter-1'));
app.use(express.static('public'));
app.use('/static', express.static('static'));


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Broadcast incoming message to all clients except the sender
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

