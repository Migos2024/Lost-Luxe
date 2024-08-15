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
    deleteBagFromCart
}
