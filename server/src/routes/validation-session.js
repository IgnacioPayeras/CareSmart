const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    console.log(req.originalUrl);
    const token = req.header('auth-token')

    if(!token) return res.status(401).json({
        error: "Acceso no autorizado"
    })

    try {
        const verified = jwt.verify(token, "sdfghjklkjhg")//reemplazar por .env

        const RolesDicctionary={
            "admin":"admin",
            "medical_chain":"chain",
            "medical_center":"center",
            "doctor" : "medic",
            "patient" : "patient"
            //falta los otros usuarios
        };

        console.log(req.originalUrl , RolesDicctionary[verified.rol])

        req.user = verified 

        if(req.originalUrl.indexOf(RolesDicctionary[verified.rol]) === -1){
            return res.status(403).json({error:"Acceso no autorizado"})
        } 

        next()
    }catch(error){
        res.status(400).json({
            error: "Token no valido, Inicia sesion"
        })
    }

}

module.exports = verifyToken