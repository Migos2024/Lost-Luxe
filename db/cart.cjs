const client = require('./client.cjs');
const createCustomerTable = require ('./seed.cjs');

const createCartTable =require('./seed.cjs');

const fetchCartByCustomerId = async () => {
    try{ 
        const result = await client.query(`
         SELECT * FROM cart
         WHERE customer_id = $1   
            `, [customer_id]);
            return result.rows

    } catch (err){
        console.log(err);
        return null;
    }
}

const addBagToCart = async ( customerId, bagId) => {
     try{
        (`
        INSERT INTO cart (price_total, is_open, customer_id, bag_id)
        VALUES (0, true, $1, $2)
        Returning *;
        `, [customerId, bagID]);
     } catch (err) {
        console.log(err);
     }
}

const deleteBagFromCart = async (cartId) =>{
    try{
        await client.query(`
         UPDATE cart
         SET bag_id NULL
         Where id = $1   
            `, [cartId]);
            return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    createCartTable,
    fetchCartByCustomerId,
    deleteBagFromCart,
    addBagToCart
}
