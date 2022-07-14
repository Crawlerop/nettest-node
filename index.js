const express = require("express");
const websocket = require("ws");

var app = express();
app = require('express-ws')(app).app;

app.ws("/zeroes", 
/**
 * zeroes
 * @param {websocket.WebSocket} ws 
 * @param {express.Request} req
 */
  (ws, req) => {
    var closed = false;
    var size = 32;
    if (req.query.size) size = parseInt(req.query.size);

    ws.on("close", ()=>{closed = true})
    
    ws.on("message", (e) => {
      ws.send(Buffer.alloc(size*1000));
    });      
})

app.get("/", (req, res) => {
    res.sendFile("/root/ws-test/test.html")
});

app.get("/256mb", (req, res) => {
    res.sendFile("/root/ws-test/256mb.dat")
});

app.listen(65010)
