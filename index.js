const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./config/db.js')

const {createEventsTable} = require('./models/eventsTable.js')

createEventsTable();
// Initialize Express app
const app = express();
app.use(bodyParser.json());

const chance = require('chance').Chance();

// Initialize PostgreSQL connection pool


// API Endpoints

// Cancel CTA
app.get('/cancel', (req, res) => {
    // Close the filter drawer (no action needed for this demo)
    res.send('Filter drawer closed');
});

// Filters Heading
app.get('/filters', (req, res) => {
    res.send('FILTERS');
});

// Apply CTA - Initially disabled
let applyEnabled = false;

app.post('/apply', (req, res) => {
    if (applyEnabled) {
        // Apply filter logic here
        res.send('Filters applied');
    } else {
        res.status(400).send('No filters selected');
    }
});

// Sort By

// A-Z sorting
app.get('/sort/A-Z', (req, res) => {
    // Implement A-Z sorting logic
    res.send('Sorted A-Z');
});

// Z-A sorting
app.get('/sort/Z-A', (req, res) => {
    // Implement Z-A sorting logic
    res.send('Sorted Z-A');
});

// Date

// Filter by specific date
app.get('/date/:date', (req, res) => {
    const date = req.params.date;
    // Implement date filtering logic
    res.send(`Filtered by date: ${date}`);
});

// Enable Apply CTA when user selects an option
app.post('/enableApply', (req, res) => {
    const { option } = req.body;
    if (option) {
        applyEnabled = true;
        res.send('Apply enabled');
    } else {
        applyEnabled = false;
        res.send('Apply disabled');
    }
});

const dates = ["All", "June" , "June" , "June" , "June"];

app.post('/filter', (req, res) => {
    const eventName = chance.name();
    const randNumber = Math.floor(Math.random() * 5);
    const date = dates[randNumber];
    const venue = chance.word();

    const query = 'INSERT INTO eventsTable (event, date, venue) VALUES (?, ?, ?)';
    const values = [eventName, date, venue];

    dbConnection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error saving data');
        } else {
            res.json(result);
        }
    });
});






// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
