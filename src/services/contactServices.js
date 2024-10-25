import db from '../config/db';

const createContact = async (userData) => {
  const createContactQuery = `
  INSERT INTO 
  contacts (createdby, name, email, phonenumber, address, timezone) 
  VALUES 
  (?, ?, ?, ?, ?, ?)`;

  const values = [
    userData.createdby,
    userData.name,
    userData.email,
    userData.phonenumber,
    userData.address,
    userData.timezone
  ];

  try {
    await db.query(createContactQuery, values);
    return {message:"Contact create Successfully"}
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};

const getContacts = async (queryParams) => {
  try{
    let getContactQuery
    if(queryParams.id){
      getContactQuery =`SELECT * FROM contacts WHERE createdby = '${queryParams.id}'`
    }
    // else{
    //   getContactQuery = `SELECT * FROM contacts`;
    // }
    const data = await db.query(getContactQuery)
    return data[0]
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const oneContact = async (Params) => {
  try{
    const contactQuery = `SELECT * FROM contacts WHERE id = '${Params.id}'`
    const data = await db.query(contactQuery)
    return data[0]
  }catch(error){
    console.error(error);
    throw error;
  }
}

const updateContact = async (userData) => {
  try {
    const contactQuery = `
      UPDATE contacts 
      SET 
        name = ?, 
        email = ?, 
        phonenumber = ?, 
        address = ?
      WHERE 
        id = ?`;
      
    const values = [
      userData.name,
      userData.email,
      userData.phonenumber,
      userData.address,
      userData.id,
    ];
    
    await db.query(contactQuery, values);
    return { message: "Update Successfully" };
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};


const deleteContact = async (queryParams) => {
  try{
    const deleteContactQuery = `DELETE FROM contacts WHERE id = '${queryParams.id}'`
    await db.query(deleteContactQuery)
    return {message:"Delete Contact Succesfully"}
  }catch(error){
    console.error(error);
    throw error;
  }
}

export { createContact, getContacts, oneContact,updateContact, deleteContact };
