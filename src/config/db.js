import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',  
  user: 'root', 
  password: 'Venkey@257', 
  database: 'mytesdb', 
});

export default db;
