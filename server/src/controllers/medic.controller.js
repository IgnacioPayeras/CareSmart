const getConnection = require("./../database");
const passwordManager = require("../passwordManager");

const getMedic = async(req,res) =>{
    try{
        const rut = req.params.rut;
        const client = await getConnection.client;
        const centerId = req.user.id;
        const query = await client.query(`select * from doctor where (rut=$1 and id_medical_center=$2)`,[rut,centerId]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getMedics = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const centerId = req.user.id;
        const query = await client.query(`select * from doctor where id_medical_center=$1`,[centerId]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const getMedicsPatient = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const centerId = req.params.centerId;
        const specialtyId = req.params.specialtyId;
        const query = await client.query(`select * from doctor where (id_medical_center=$1 and id_specialty=$2)`,[centerId,specialtyId]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const addMedic = async(req,res) =>{
    try{
        const rut = (req.body.rut).replace(/\s/g,'');
        const medic_center_id = req.user.id;
        const specialty_id = req.body.id_specialty;
        const complete_name = req.body.full_name; 
        const password = req.body.password;
        const phone = req.body.phone;
        const service_duration = req.body.attencion_duration;
        const email = req.body.email;

        if(rut === undefined || medic_center_id === undefined || specialty_id === undefined || complete_name === undefined || password === undefined || phone === undefined || service_duration === undefined || email == undefined){
            return res.status(400).json({message: "Bad Request. Please fill all field"});
        }

        const client = await getConnection.client;
        await client.query(`INSERT INTO "doctor" ("rut", "id_medical_center", "id_specialty", "full_name", "password", "phone", "attention_duration", "email") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [rut, medic_center_id, specialty_id, complete_name, await passwordManager.getEncriptedPassword(password), phone, service_duration, email]);
        res.status(200).json({ message: "Medic added" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const deleteMedic = async(req,res) =>{
    try{
        const rut = req.params.rut;
        const client = await getConnection.client;
        const query = await client.query(`delete from doctor where rut=$1`,[rut]);
        if(query["rowCount"] === 0 ) return res.status(404).json({error : "Error al eliminar medico"})
        if(query["rowCount"] === 1 ) return res.status(200).json({ message: "Medic deleted" });
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const updateMedic = async(req,res) =>{
    try{
        const rut = req.params.rut;
        const medic_center_id = req.user.id;
        const complete_name = req.body.full_name; 
        const password = req.body.password;
        const phone = req.body.phone;
        const service_duration = req.body.attencion_duration;
        const email = req.body.email;
        const specialty = req.body.id_specialty;

        console.log(specialty)
        
        const databaseAccess = await getConnection.client;

        if(complete_name !== undefined ){
            await databaseAccess.query(`update doctor set full_name=$1 where rut=$2`,[complete_name,rut]);
        }
        
        if(phone !== undefined ){
            await databaseAccess.query(`update doctor set phone=$1 where rut=$2`,[phone,rut]);
        }

        if(password !== undefined ){
            await databaseAccess.query(`update doctor set password=$1 where rut=$2`,[await passwordManager.getEncriptedPassword(password),rut]);
        }

        if(medic_center_id !== undefined ){
            await databaseAccess.query(`update doctor set id_medical_center=$1 where rut=$2`,[medic_center_id,rut]);
        }
        if(service_duration !== undefined ){
            await databaseAccess.query(`update doctor set attention_duration=$1 where rut=$2`,[service_duration,rut]);
        }
        if(email !== undefined){
            await databaseAccess.query(`update doctor set email=$1 where rut=$2`,[email,rut]);
        }
        if(specialty !== undefined){
            await databaseAccess.query(`update doctor set id_specialty=$1 where rut=$2`,[specialty,rut]);
        }

        res.status(200).json({ message: "Medic updated sucsesfully" });

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const methods = {
    getMedic,
    getMedics,
    getMedicsPatient,
    addMedic,
    deleteMedic,
    updateMedic,
};

module.exports = methods;