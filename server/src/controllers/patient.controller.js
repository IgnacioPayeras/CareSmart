const getConnection = require("./../database");

const getAccountState = async(req,res) =>{
    
    try{
        const rut = req.body.rut;
        const client = await getConnection.client;
        const query = await client.query(`select state from patient where rut=$1 `,[rut]);
        if(query["rows"].length === 1){
            const result = query['rows'][0]
            return res.status(200).json(result);
        }else {
            return res.status(404).json({})
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};


const methods = {
    getAccountState
};

module.exports = methods;