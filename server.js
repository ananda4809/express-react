const express = require('express');

const app = express();

app.get('/api/getNotes', (req, res)=>{
    const defaultNotes = [
        { note : "google", desc : "search engine" },
        { note : "gmail", desc: "communication channel"},
        { note : "facebook", desc : "social media application"}
    ];
    res.json(defaultNotes);
})

const port = 3001;

app.listen(port, ()=>{
    console.log(`App listening to port number ${port}`);
});
