require('dotenv').config();
const client = require('./client.cjs');
const {createBag, getSingleBag} = require('./bags.cjs');
const fetchCartByCustomerId = require('./cart.cjs');
const deleteBagFromCart = require('./cart.cjs');
const addBagToCart = require('./cart.cjs');
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
        price: 3599.27,
        image: 'black1.jpeg'
      },
      {
        bag_name: 'Black Knitted',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.83,
        image: 'black2.jpeg'
      },
      {
        bag_name: 'White/Black',
        brand: 'Chanel',
        release_date: 2014,
        description: 'A gorgeous leather Chanel handbag with enticing black hardware.',
        price: 2379.69,
        image: 'black3.jpeg'
      },
      {
        bag_name: 'Blue/Lilac',
        brand: 'Chanel',
        release_date: 2017,
        description: 'This suede Chanel bags elevates your look.',
        price: 2752.79,
        image: 'blue1.jpeg'
      },
      {
        bag_name: 'Blue/ Gold',
        brand: 'Chanel',
        release_date: 2012,
        description: 'A stylish blue leather handbag. It has lovely gold hardware to better suit your style!',
        price: 1379.99,
        image: 'blue2.jpeg'
      },
      {
        bag_name: 'Green/ Gold',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality leather Chanel with astounding gold hardware with leather woven-in.',
        price: 3979.99,
        image: 'green1.jpeg'
      },
      {
        bag_name: 'Mint',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A mint Chanel handbag so fresh, your breath will feel it. This Chanel comes adorned with silver and mint hardware and mint leather woven-in.',
        price: 4439.23,
        image: 'green2.jpeg'
      },
      {
        bag_name: 'Sorbet/ Gold',
        brand: 'Chanel',
        release_date: 2017,
        description: 'Bring on the summer with some Sorbet in your life. Gold hardware for class',
        price: 2779.99,
        image: 'orange1.jpeg'
      },
      {
        bag_name: 'Sorbet/ Clutch',
        brand: 'Chanel',
        release_date: 2017,
        description: 'Dare to fit summer in a clutch?',
        price: 2379.99,
        image: 'orange2.jpeg'
      },
      {
        bag_name: 'Pearl',
        brand: 'Chanel',
        release_date: 2017,
        description: 'Pearl Chanel handbag from 2017 Spring/ Summer collection',
        price: 13379.99,
        image: 'pearl1.jpeg'
      },
      {
        bag_name: 'Pink Knitted',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'pink1.jpeg'
      },
      {
        bag_name: 'Pink/ Gold',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'pink2.jpeg'
      },
      {
        bag_name: 'Pink Box',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'pink3.jpeg'
      },
      {
        bag_name: 'Pink Gold/Silver',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'pink4.jpeg'
      },
      {
        bag_name: 'Peace Pink',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'pink5.jpeg'
      },
      {
        bag_name: 'Deep Pink',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'pink6.jpeg'
      },
      {
        bag_name: 'Purple',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'purple1.jpeg'
      },
      {
        bag_name: 'Cherry',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'red1.jpeg'
      },
      {
        bag_name: 'Maroon',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'red2.jpeg'
      },
      {
        bag_name: 'Silver',
        brand: 'Chanel',
        release_date: 2017,
        description: 'A quality knit Chanel handbag with beautiful gold hardware.',
        price: 5379.99,
        image: 'silver1.jpeg'
      },
    ]

    for(const bag of bags) {
      const imagePath = path.join('/chanelBags', bag.image)
      await createBag(bag.bag_name, bag.brand, bag.release_date, bag.description, bag.price, imagePath)
    }
  };

  const seedData = async () => {
    await client.connect();
    await dropTables();
    await createBagTable();
    await createCustomerTable();
    await createCartTable();
    await seedBags();
    await getSingleBag(1);
    await fetchCartByCustomerId();
    await addBagToCart();
    await deleteBagFromCart();
    await client.end();
  }


  seedData();
