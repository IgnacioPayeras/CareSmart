const client = require('./../database');
const jwt = require('jsonwebtoken')

const getLogin = async(req,res) =>{
    try{
        const key = req.body.key;
        const password = req.body.password;
        const result =  await client.login(key,password);
        
        if(result !== "Not Found" && result !== "Incorrect Password"){
            console.log(result)
            const token = jwt.sign(result.token,"sdfghjklkjhg")//reemplazar por .env

            res.status(200).json({"token": token, "data_user" : result.data_user});
        }else{
            res.status(400).json(result);
        }

        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

module.exports = {
    getLogin
}