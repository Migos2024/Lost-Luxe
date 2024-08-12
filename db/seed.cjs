const client = require("./client.cjs");

const dropTables = async () => {
    try{
        await client.query(`
            DROP TABLE IF EXISTS bags;
            DROP TABLE IF EXISTS sellers;
            
        
         `);
    } catch (err) {
        console.log(err);
    }
};


const createCustomerTable = async () => {
    try {
      await client.query(`
              CREATE TABLE IF NOT EXISTS customer (
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
            price Real NOT NULL)
            
            `)
    } catch (err){
        console.log(err);
  }
  };



  const seedData = async () => {
    await client.connect();
    await createBagTable();
    await createCustomerTable();
    await client.end();
  }