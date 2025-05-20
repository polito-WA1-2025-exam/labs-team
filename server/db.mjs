import sqlite3 from 'sqlite3';
sqlite3.verbose(); // optional, for detailed error messages

const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

export default db;
