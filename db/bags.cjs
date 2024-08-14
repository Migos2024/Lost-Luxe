const client = require('./client.cjs');


const createBag = async (bag_name, brand, release_date, description, price, image_path) => {
    try{
        const bagInfo = await client.query(`
            INSERT INTO bags
            (bag_name, brand, release_date, description, price, image_path)
            VALUES ($1, $2, $3, $4, $5, $6)
            `, [bag_name, brand, release_date, description, price, image_path]);

            // console.log(bagInfo);

    } catch (err) {
        console.log(err);
    }
}

const getAllBags = async () => {
    try{
        const { rows } = await client.query(`
            SELECT * FROM bags;
            `);
            // return rows;
    } catch (err){
        console.log(err);
    }
}

const getSingleBag = async (id) => {
   try{
    const oneBag = await client.query(`
        SELECT * FROM bags
        WHERE bags.id = $1;
        `, [id]);
        // return oneBag.rows[0];
   } catch (err) {
    console.log(err);
    return null;
   }

}


module.exports = {
    createBag,
    getAllBags,
    getSingleBag
}
