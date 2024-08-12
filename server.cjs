const client = require('./client.cjs');
const express = require('express');

const app = express();

app.use(express.json());

client.connect();

pp.get('/api/v1/bags', async (req, res, next) => {
    try {
        const bags = await getAllBags();
        res.json(bags);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch bags' });
    }
});

// POST route to create a new seller
app.post('/api/v1/customer', async (req, res, next) => {
    try {
        const { username, emailAddress, firstName, lastName, accountNumber } = req.body;

        if (!username || !emailAddress || !firstName || !lastName || !accountNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await client.query(`
            INSERT INTO sellers (Username, EmailAddress, FirstName, LastName, AccountNumber)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [username, emailAddress, firstName, lastName, accountNumber]);

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));