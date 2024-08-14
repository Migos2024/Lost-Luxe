const client = require('./client.cjs');


const createBag = async (bagname, brand, releasedate, description, price) => {
    try{
        const bagInfo = await client.query(`
            INSERT INTO bags
            (bag_name, brand, release_date, description, price, image_path)
            VALUES ($1, $2, $3, $4, $5, $6)
            `, [bag.bag_name, bag.brand, bag.release_date, bag.description, bag.price, imagePath]);

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

const getSingleBag = async () => {
   try{
    const oneBag = await client.query(`
        SELECT * FROM bags
        WHERE id = $1;
        `, [id]);
        return oneBag.rows[0];
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
