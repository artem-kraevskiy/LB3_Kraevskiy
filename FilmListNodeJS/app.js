const express = require('express');
const path = require('path');
const list = [];

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/src', express.static(__dirname + '/src'))

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/films', (req, res) =>{
    res.json(list);
});

app.put('/films', (req, res) =>{
    if('id' in req.body && 'nazv' in req.body && 'reit' in req.body
        && 'zanr' in req.body && 'opis' in req.body)
    {
        list.push(req.body);
        res.status(201);
    }
    else
        res.status(400);
});

app.post('/films', (req, res) =>{
    if('id' in req.body && 'nazv' in req.body && 'reit' in req.body
        && 'zanr' in req.body && 'opis' in req.body)
    {
        let i = 0;
        for(; i < list.length; i++)
            if(list[i].id == req.body.id)
                break;
                
        if(i < list.length)
        {
            list[i].nazv = req.body.nazv;
            list[i].reit = req.body.reit;
            list[i].zanr = req.body.zanr;
            list[i].opis = req.body.opis;
            res.status(202);
        }
        else
            res.status(400);
    }
    else
        res.status(400);
});

app.delete('/films', (req, res) =>{
    for(let i = 0; i < list.length; i++)
        if(req.body.indexOf(list[i].id) != -1)
            list.splice(i--, 1);

    res.status(202);
});

app.get('/last-id', (req, res) =>{
    res.send(list.length == 0 ? "0" : `${+list[list.length - 1].id + 1}`);
});

app.listen(port, hostname);
console.log(`Running server at http://${hostname}:${port}`);