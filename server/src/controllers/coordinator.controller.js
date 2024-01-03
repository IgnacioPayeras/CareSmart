const getConnection = require("../database");
const passwordManager = require("../passwordManager");

const getCoordinator = async(req,res) =>{
    try{
        const {rut} = req.params.rut;
        const client = await getConnection.client;
        const centerId = req.user.id;
        const query = await client.query(`select * from coordinator where (rut=$1 and id_medical_center=$2)`,[rut,centerId]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getCoordinators = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const centerId = req.user.id;
        const query = await client.query(`select * from coordinator where id_medical_center=$1`,[centerId]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const addCoordinator = async(req,res) =>{
    try{
        const rut = req.body.rut;
        const medic_center_id = req.user.id;
        const complete_name = req.body.full_name;
        const password = req.body.password;
        const email = req.body.email;

        if(rut === undefined || medic_center_id === undefined || complete_name === undefined || password === undefined || email === undefined ){
            return res.status(400).json({message: "Bad Request. Please fill all field"});
        }

        const client = await getConnection.client;
        await client.query(`INSERT INTO "coordinator" ("rut", "id_medical_center", "full_name", "password", "email") 
        VALUES ($1, $2, $3, $4, $5)`, [rut, medic_center_id, complete_name,await passwordManager.getEncriptedPassword(password), email]);
        res.status(200).json({ message: "Coordinator added" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const deleteCoordinator = async(req,res) =>{
    try{
        const rut = req.params.rut;
        const client = await getConnection.client;
        await client.query(`delete from coordinator where rut=$1`,[rut]);
        res.status(200).json({ message: "Coordinator deleted" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const updateCoordinator = async(req,res) =>{
    try{
        const rut = req.params.rut;
        const medic_center_id = req.user.id;
        const complete_name = req.body.full_name;
        const password = req.body.password;
        const email = req.body.email;

        const databaseAccess = await getConnection.client;
        if(medic_center_id !== undefined ){
            await databaseAccess.query(`update coordinator set id_medical_center=$1 where rut=$2`,[medic_center_id,rut]);
        }

        if(complete_name !== undefined ){
            await databaseAccess.query(`update coordinator set full_name=$1 where rut=$2`,[complete_name,rut]);
        }
        
        if(password !== undefined ){
            await databaseAccess.query(`update coordinator set password=$1 where rut=$2`,[await passwordManager.getEncriptedPassword(password),rut]);
        }

        if(email !== undefined){
            await databaseAccess.query(`update coordinator set email=$1 where rut=$2`,[email,rut]);
        }
        
        res.status(200).json({ message: "Conrdinator updated" });

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const methods = {
    getCoordinator,
    getCoordinators,
    addCoordinator,
    deleteCoordinator,
    updateCoordinator,
};

module.exports = methods;