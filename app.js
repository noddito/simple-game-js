import express from 'express';
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/styles.css', (req, res) =>{
    res.sendFile(path.join(__dirname, 'styles.css'))
})
app.get('/game.js', (req, res) =>{
    res.sendFile(path.join(__dirname, 'game.js'))
})
app.listen(3000);