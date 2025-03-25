const express = require('express');
let router = express.Router();
let path = require('path');

// Serve the "aboutMe" page for the root URL
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'aboutMe.html'));
    console.log(`about me page sent `);
    
});

// Serve the "index" page for the "/projects" URL
router.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
    console.log(`projects page sent `);

});

// Serve the "elements" page for the "/certifications" URL
router.get('/certifications', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'elements.html'));
    console.log(`certification page sent `);

});

// Serve the "powerBi" page for the "/powerBi" URL
router.get('/powerBi', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'powerBi.html'));
    console.log(`powerBi page sent `);

});

// Serve the "python" page for the "/python" URL
router.get('/python', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'python.html'));
    console.log(`python page sent `);

});

// Serve the "sql" page for the "/sql" URL
router.get('/sql', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'sql.html'));
    console.log(`sql page sent `);

});

module.exports = router;

