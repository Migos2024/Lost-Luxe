const client = require("./client.cjs");

const createCustomer = async(username, emailaddress, firstname, lastname, accountnumber, password) => {

  try { await client.query(`
    INSERT INTO customers (username, emailaddress, firstname, lastname, accountnumber, password)
    VALUES ('${username}', '${emailaddress}', '${firstname}', '${lastname}', 
    ${accountnumber}, '${password})
  `)
    
  } catch (error) {
    throw error;
  }
}

module.exports = { createCustomer }