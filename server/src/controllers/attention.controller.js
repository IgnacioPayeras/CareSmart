const schedule = require("../scheduleManager");
const getConnection = require("../database");
const mailManager = require("./patientAccount.controller")


const getAvailableBlocks = async(req,res) =>{
    try{
        ///// date format "yyyy-mm-dd"
        const medicRut = req.params.rut;  
        const date = req.params.date;
        console.log("medicRut+","+date");
        console.log(medicRut+","+date);
        //// check if the date is valid
        const s=date+" "+"00:00:00";
        const validDate = new Date(s);

        const result= await schedule.getAvailableBlocks(medicRut,validDate);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getAttention = async(req,res) =>{
    try{
        const id= req.params.id;
        const client = await getConnection.client;
        const rut = req.user.key;
        const query = await client.query(`select * from attention where (id=$1 and rut_pattient=$2)`,[id,rut]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getAttentions = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const rut = req.user.key;
        const query = await client.query(`select id, rut_doctor, start_time, to_char(date, 'DD-MM-YYYY') as date from attention where rut_pattient=$1`,[rut]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getAttentionsMedic = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const rut = req.user.key;
        const query = await client.query(`select id, rut_doctor, start_time, to_char(date, 'DD-MM-YYYY') as date from attention where (rut_doctor=$1)`,[rut]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getAttentionsByDateMedic = async(req,res) =>{
    try{
        const client = await getConnection.client;
        const rut = req.user.key;
        const date = req.params.date;
        const query = await client.query(`select id, rut_doctor, start_time, to_char(date, 'DD-MM-YYYY') as date from attention where (rut_doctor=$1 and date=$2)`,[rut,date]);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};


const addAttention = async (req, res) => {
    try {
        const medicRut = req.body.medicRut;
        const patientRut = req.user.key;
        const date = req.body.date;
        const startTime = req.body.startTime;
        const estimatedEnd = req.body.estimatedEnd;

        console.log(req.body)

        if ((medicRut === undefined) || (patientRut === undefined) || (date === undefined) || (startTime === undefined) || (estimatedEnd === undefined)) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields" });
        }

        console.log("add attention");
        console.log(medicRut + "," + patientRut + "," + date + "," + startTime + "," + estimatedEnd);

        const client = await getConnection.client;
        await client.query(
            `INSERT INTO "attention" (rut_doctor,rut_pattient,date,start_time,estimated_finish_time) 
            VALUES ($1,$2,$3,$4,$5)`, [medicRut, patientRut, date, startTime, estimatedEnd]);

        const currentDate = Date.now();
        const now = new Date(currentDate);
        const day = now.getDay();
        const month = now.getMonth();
        const year = now.getFullYear();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const timeString = date+ " a las  " + startTime + "hrs"
        
        const p =await client.query('select * from patient where rut=$1', [patientRut]);
        const m =await client.query('select * from doctor where rut=$1', [medicRut]);
        
        const email = p.rows[0]['email'];
        const name = p.rows[0]['full_name'];
        const medicName = m.rows[0]['full_name'];
        console.log(email);
        const subject = 'Hora reservada';
        const text = 'Hola '+name+' acabas de reservar una hora con '+medicName+'  el dia '+timeString;
        mailManager.customSendMail(email, subject, text);
        res.status(200).json({ message: "Attention added" });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const deleteAttention = async(req,res) =>{
    try{
        const id = req.params.id;
        const patientRut=req.user.key;
        const client = await getConnection.client;
        await client.query(`delete from attention where (id=$1 and rut_pattient=$2)`,[id,patientRut]);
        res.status(200).json({message:"Attention deleted"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};


const methods = {
    getAvailableBlocks,
    getAttention,
    getAttentions,
    getAttentionsMedic,
    getAttentionsByDateMedic,
    addAttention,
    deleteAttention
};

module.exports = methods;