const getConnection = require("./../database");

const getSpecialty = async(req,res) =>{
    
    try{
        const id = req.params.id;
        const centerId=req.user.id;
        const client = await getConnection.client;
        const query = await client.query(`select * from specialty where (medical_center_id=$1 and id=$2)`,[centerId,id]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getSpecialties = async(req,res) =>{

    try{
        const centerId=req.user.id;
        const client = await getConnection.client;
        const query = await client.query(`select * from specialty where medical_center_id=$1`,[centerId]);
        const result = query['rows'];
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const getSpecialtiesPatient = async(req,res) =>{
    try{
        const centerId=req.params.centerId;
        const client = await getConnection.client;
        const query = await client.query(`select * from specialty where medical_center_id=$1`,[centerId]);
        const result = query['rows'];
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};


const addSpecialty = async(req,res) =>{
    try{
        const name = req.body.name;
        const centerId=req.user.id;

        if(name === undefined){
            return res.status(400).json({message: "Bad Request. Please fill all field"});
        }

        const client = await getConnection.client;
        await client.query(
            `INSERT INTO "specialty" ("name","medical_center_id") 
            VALUES ($1,$2)`, [name,centerId]);
        res.status(200).json({ message: "Specialty added" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const deleteSpecialty = async(req,res) =>{
    try{
        const id = req.params.id;
        const centerId=req.user.id;
        const client = await getConnection.client;
        await client.query(`delete from specialty where (id=$1 and medical_center_id=$2)`,[id,centerId]);
        res.status(200).json({message:"Specialty deleted"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const updateSpecialty = async(req,res) =>{
    try{
        const id = req.params.id;
        
        const name = req.body.name;

        const databaseAccess = await getConnection.client;
        if(name === undefined){
            res.status(400).json({message: "Bad Request. Please fill any field"});
        }
        else{
            await databaseAccess.query(`update specialty set name=$1 where id=$2`,[name,id]);
            res.status(200).json({message:"Specialty updated"});
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const methods = {
    getSpecialty,
    getSpecialties,
    getSpecialtiesPatient,
    addSpecialty,
    deleteSpecialty,
    updateSpecialty,
};

module.exports = methods;
