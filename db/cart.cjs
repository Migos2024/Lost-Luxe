const client = require('./client.cjs');

const createCartTable =require('./seed.cjs');

const fetchCartByCustomerId = async () => {
    try{ 
        const result = await client.query(`
         SELECT * FROM cart
         WHERE customer_id = $1   
            `, [customr_id]);
            return result.rows

    } catch (err){
        console.log(err);
        return null;
    }
}

// const customerId = ();
// const cart = await fetchCartByCustomerId(customer_id);
// if (cart) {
//     console.log(cart);
// }else{
//     console.log("No cart found for customer ID", customer_id)
// }