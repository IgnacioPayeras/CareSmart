const getConnection = require("./../database");
const bcrypt = require("bcrypt");
const update = require('./../patient.controller');

let regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

const ResetPassword = {
    async reset(req, res) {
        if (!regExPassword.test(req.body.password)) {
            res.send({messagge: "The password must contain at least: between 8 and 16 characters, 1 number, 1 lowercase letter, 1 capital letter and 1 special character"});
            return;
        }

        try {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const resetPassword = await databaseAccess.query(`update patient set password=$1 where (rut=$2 and tokenresetpassword=$3)`,[req.body.password,req.params.rut,req.params.tokenresetpassword]);
            res.status(201).send({messagge: "Contraseña cambiada con éxito"})

        } catch (error) {
            res.status(500).send({messagge: "Este error", error})
        }
    }
}

module.exports = ResetPassword;