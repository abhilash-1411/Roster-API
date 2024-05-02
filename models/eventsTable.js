const dbConnection = require('../config/db.js')
const createEventsTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS eventsTable (
        _id SERIAL PRIMARY KEY,
        event VARCHAR(255) ,
        date VARCHAR(255),
        venue VARCHAR(255) 
      )
    `;
  
    dbConnection.query(createTableQuery, (err, result) => {
      if (err) {
        console.error('Error creating events table: ' + err.stack);
        return;
      }
      console.log('Events table created or already exists.');
    });
  };

  module.exports = {createEventsTable}
  