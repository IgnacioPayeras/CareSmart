const getConnection = require("./../database");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { response } = require("express");
require('dotenv').config();

const ForgotPassword = {
    async sendMail(req, res) {
        const emailParam = req.body.email;
        if(emailParam == "") {
            res.status(400).send({messagge: "El email es requerido"})
        }

        try{
            const client = await getConnection.client;
            const patient = await client.query(`select * from patient where (email=$1)`,[emailParam]);
            
            if(!patient){
                return res.status(403).send({messagge: "No existe ese email"})
            }

            const token = jwt.sign({rut: patient.rut}, '', { expiresIn: "30m" });
            patient.update({
                tokenResetPassword: token
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                }
            });

            const emailPort = process.env.EMAIL_PORT || 3000;

            const mailOptions = {
                from: 'ignaciopayeras7@gmail.com',
                to: `${patient.email}`,
                subject: 'Enlace para recuperar contrasenia',
                text:
                `${emailPort}/resetpassword/${patient.rut}/${token}`
            };

            transporter.sendMail(mailOptions, (err,response) => {
                if (err){
                    console.error("Ha ocurrido un error:",err);
                } else {
                    console.log("Respuesta:", response);
                    res.status(200).json('El email para la recuperación ha sido enviado');
                }
            })
        
        }
        catch (error){
            res.status(500).send({messagge: "Ha ocurrido un error", error})
        }
    }
}

module.exports = ForgotPassword;