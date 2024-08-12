const client = require("./client.cjs");

const dropTables = async () => {
    try{
        await client.query(`
            DROP TABLE IF EXISTS cart;
            DROP TABLE IF EXISTS bags;
            DROP TABLE IF EXISTS customers;
          
        
         `);
    } catch (err) {
        console.log(err);
    }
};


const createCustomerTable = async () => {
    try {
      await client.query(`
              CREATE TABLE IF NOT EXISTS customers (
                  username VARCHAR(50) PRIMARY KEY,
                  emailaddress VARCHAR(100) NOT NULL,
                  firstname VARCHAR(50) NOT NULL,
                  lastname VARCHAR(50) NOT NULL,
                  accountnumber INT UNIQUE,
                  password VARCHAR(20) NOT Null
              );
          `);
      console.log("Customer table created successfully.");
    } catch (err) {
      console.error("Error creating Customer table:", err);
    } finally {
    }
  };

  const createBagTable = async () => {
    try{
        await client.query(`
            CREATE TABLE IF NOT EXISTS bags (
            id SERIAL PRIMARY KEY,
            bag_name VARCHAR(50) NOT NULL,
            brand VARCHAR(50) NOT NULL,
            release_date INT,
            description TEXT,
            price Real NOT NULL);
            
            `);
    } catch (err){
        console.log(err);
  }
  };

  const createCartTable = async () => {
    try{
        await client.query(`
            CREATE TABLE IF NOT EXISTS cart(
             id SERIAL PRIMARY KEY,
             price_total Real NOT NULL, 
             is_open BOOLEAN NOT NULL,
             customer_id INT REFERENCES customers(id),
             bag_id INT REFERENCES bags(id)
            );
            `);
    } catch(err) {
        console.log(err);
    }
  }



  const seedData = async () => {
    await client.connect();
    await dropTables();
    await createBagTable();
    await createCustomerTable();
    await createCartTable();
    await client.end();
  }

  seedData();