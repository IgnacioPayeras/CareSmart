const getConnection = require("./../database");
const passwordManager = require("../passwordManager");

const getMedicChain = async(req,res) =>{
    try{
        const id = req.params.chainId;
        const client = await getConnection.client;
        console.log("iddddddddddddd: "+id);
        const query = await client.query(`select id,name,email from medical_chain where id=$1`,[id]);
        const result = query['rows'][0];
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getMedicChains = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const query = await client.query(`select id,name,email from medical_chain`);
        const result = query['rows']
        res.status(200)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const addMedicChain = async(req,res) =>{
    try{
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        if(name === undefined || password === undefined || email === undefined){
            res.status(400).json({message: "Bad Request. Please fill all field"});
        }

        const client = await getConnection.client;
        await client.query(
            `INSERT INTO "medical_chain" ("name", "password", "email") 
            VALUES ($1, $2, $3)`, [name, await passwordManager.getEncriptedPassword(password), email]);
        res.status(200).json({ message: "Medic chain added" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const deleteMedicChain = async(req,res) =>{
    try{
        const id = req.params.id;
        const client = await getConnection.client;
        await client.query(`delete from medical_chain where id=$1`,[id]);
        res.status(200).json({message:"Medic chain deleted"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const updateMedicChain = async(req,res) =>{
    try{
        const id = req.params.id;
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const databaseAccess = await getConnection.client;
        if(name !== undefined ){
            await databaseAccess.query(`update medical_chain set name=$1 where id=$2`,[name,id]);
        }

        if(password !== undefined ){
            await databaseAccess.query(`update medical_chain set password=$1 where id=$2`,[await passwordManager.getEncriptedPassword(password),id]);
        }

        if(email !== undefined ){
            await databaseAccess.query(`update medical_chain set email=$1 where id=$2`,[email,id]);
        }
        res.status(200).json({message:"Medic chain updated"});

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const methods = {
    getMedicChains,
    getMedicChain,
    addMedicChain,
    deleteMedicChain,
    updateMedicChain,
};

module.exports = methods;