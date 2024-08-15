const client = require('./client.cjs');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

client.connect();

// app.get('/', (res, req, next) => {
//     res.sendFile(__dirname + '/dist/index.html')
// })

app.post ('/api/v1/login', async(res, req, next) => {
    try {
        console.log(req.body);
    }catch(err) {
        console.log(err);
    }
 
})

 app.get('/api/v1/bags', async (req, res, next) => {
    try {
        const bags = await getAllBags();
        res.json(bags);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch bags' });
    }
});


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

app.post('/api/v1/cart/add-item', async (req, res) => {
    try {
        const { customer_id, bag_id, price } = req.body;

        
        const [customerExists, bagExists] = await Promise.all([
            client.query(`SELECT 1 FROM customers WHERE id = $1`, [customer_id]),
            client.query(`SELECT 1 FROM bags WHERE id = $1`, [bag_id])
        ]);

        if (!customerExists.rows.length || !bagExists.rows.length) {
            return res.status(404).json({ error: 'Customer or bag not found' });
        }

        
        const cartResult = await client.query(
            `WITH existing_cart AS (
                SELECT id FROM cart WHERE customer_id = $1 AND is_open = true
            ),
            new_cart AS (
                INSERT INTO cart (customer_id, price_total, is_open)
                SELECT $1, $2, true
                WHERE NOT EXISTS (SELECT 1 FROM existing_cart)
                RETURNING id
            )
            SELECT id FROM existing_cart
            UNION ALL
            SELECT id FROM new_cart`,
            [customer_id, price]
        );

        const cartId = cartResult.rows[0].id;
        await client.query(`INSERT INTO cart_items (cart_id, bag_id, price) VALUES ($1, $2, $3)`, [cartId, bag_id, price]);
        if (cartResult.rows.length > 1) {
            await client.query(`UPDATE cart SET price_total = price_total + $1 WHERE id = $2`, [price, cartId]);
        }

        res.status(201).json({ message: 'Item added to cart', cart_id: cartId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    }
});



app.delete('/api/v1/cart/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await client.query(`DELETE FROM cart WHERE id = $1`, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        next(error);
    }
});


app.get('/api/v1/cart/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows } = await client.query(`SELECT * FROM cart WHERE id = $1`, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(rows[0]); 
    } catch (error) {
        next(error); 
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));