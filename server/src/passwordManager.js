const bcrypt = require('bcryptjs');

const getEncriptedPassword  = async (password)=>{ 
    try {
     const encripted = await bcrypt.hash(password,9);
     return(encripted);
    } catch (error) {
         return("Error");
    }      
 };
 
 const validatePassword  = async (password,encriptedPassword)=>{ 
     if(await bcrypt.compare(password,encriptedPassword)){
         return true;
     }
     return false;
  };


  module.exports = {
    getEncriptedPassword,
    validatePassword
}
