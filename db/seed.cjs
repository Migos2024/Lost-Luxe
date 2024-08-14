require('dotenv').config();
const client = require("./client.cjs");
const {createBag} = require(`bags.cjs`);
const path = require('path');


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
              CREATE TABLE IF NOT EXISTS customers(
                  id SERIAL PRIMARY KEY,
                  username VARCHAR(50) NOT NULL,
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
            CREATE TABLE IF NOT EXISTS bags(
            id SERIAL PRIMARY KEY,
            bag_name VARCHAR(50) NOT NULL,
            brand VARCHAR(50) NOT NULL,
            release_date INT,
            description TEXT,
            price Real NOT NULL,
            image_path VARCHAR(255) NOT NULL
            );

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


  const seedBags = async ()=> {
    const bags = [
      {
        bag_name: 'Black/Gold',
        brand: 'Chanel',
        release_date: 2014,
        description: 'A stylish black leather handbag. It has lovely gold hardware to better suit your style!',
        price: 3599.99,
        image: 'black1.jpeg'
      },
      {
        bag_name: 'Black Knitted',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'black2.jpeg'
      },
    ]

    for(const bag of bags) {
      const imagePath = path.join(`/chanelBags`, bags.image)
      await createBag()
    }
  };

  const seedData = async () => {
    await client.connect();
    await dropTables();
    await createBagTable();
    await createCustomerTable();
    await createCartTable();
    await seedBags();
    await client.end();
  }



  seedData();
