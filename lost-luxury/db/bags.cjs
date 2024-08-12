const client = require('./client.cjs');


const createBag = async (bagname, brand, releasedate, description, price) => {
    try{
        const bagInfo = await client.query(`
            INSERT INTO bags (bagname, brand, releasedate, description, price)
            VALUES ($1,$2, $3, $4, $5);
            `, [bagname, brand, releasedate, description, price]);

            console.log(bagInfo);
            
    } catch (err) {
        console.log(err);
    }
}

const getAllBags = async () => {
    try{
        const { rows } = await client.query(`
            SELECT * FROM bags;
            `);
            return rows;
    } catch (err){
        console.log(err);
    }
}   



module.exports = {
    createBag,
    getAllBags
}