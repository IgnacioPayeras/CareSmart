const getConnection = require("./../database");
const passwordManager = require("../passwordManager");

const getMedicCenter = async(req,res) =>{
    try{
        const id = req.params;
        const client = await getConnection.client;
        const query = await client.query(`select id,id_medical_chain,name,address,city,email from medical_center where id=$1`,[id]);
        const result = query['rows'][0]
        res.status(200).json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};


const getMedicCenters = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const query = await client.query(`select id,id_medical_chain,name,address,city,email from medical_center where id_medical_chain=$1`,[req.user.id]);
        const result = query['rows']
        res.status(200).json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const getMedicCentersByChainId = async(req,res) =>{
    try{
        const chainId = req.params.chainId;
        const client = await getConnection.client;
        const query = await client.query(`select id,id_medical_chain,name,address,city,email from medical_center where id_medical_chain=$1`,[chainId]);
        const result = query['rows'];
        res.status(200).json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const addMedicCenter = async(req,res) =>{
    try{
        const name = req.body.name;
        const password = req.body.password;
        const address = req.body.address;
        const city = req.body.city;
        const email = req.body.email;

        if(name === undefined || password === undefined || address === undefined || city === undefined || email === undefined){
            return res.status(400).json({message: "Bad Request. Please fill all field"});
        }
        const id = req.user.id
        const client = await getConnection.client;
        await client.query(
            `INSERT INTO "medical_center" ("id_medical_chain", "name", "password", "address", "city", "email") 
            VALUES ($1, $2, $3, $4, $5, $6)`, [id, name, await passwordManager.getEncriptedPassword(password),address, city, email]);
        res.status(200).json({ message: "Medic center added" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const deleteMedicCenter = async(req,res) =>{
    try{
        const {id} = req.params;
        const client = await getConnection.client;
        const query = await client.query(`delete from medical_center where id=$1`,[id]);
        res.status(200).json("Medic center deleted successfully")
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const updateMedicCenter = async(req,res) =>{
    try{
        const id = req.params.id;
        const medic_center_id = req.user.id;
        const name = req.body.name;
        const password = req.body.password;
        const address = req.body.address;
        const city = req.body.city;
        const email = req.body.email;

        const client = await getConnection.client;
        if(medic_center_id !== undefined){
            await client.query(`update medical_center set id_medical_chain=$1 where id=$2`,[medic_center_id,id]);
        }
        if(name !== undefined){
            await client.query(`update medical_center set name=$1 where id=$2`,[name,id]);
        }
        if(password !== undefined){
            await client.query(`update medical_center set password=$1 where id=$2`,[await passwordManager.getEncriptedPassword(password), id]);
        }
        if(address !== undefined){
            await client.query(`update medical_center set address=$1 where id=$2`,[address,id]);
        }
        if(city !== undefined){
            await client.query(`update medical_center set city=$1 where id=$2`,[city,id]);
        }
        if(email !== undefined){
            await client.query(`update medical_center set email=$1 where id=$2`,[email,id]);
        }
        
        res.status(200).json("Medic center updated successfully");


    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const methods = {
    getMedicCenter,
    getMedicCenters,
    getMedicCentersByChainId,
    addMedicCenter,
    deleteMedicCenter,
    updateMedicCenter
};

module.exports = methods;